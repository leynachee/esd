from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Service Discovery URLs
# Change these in waitlist_manager/app.py:
JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004")
WAITLIST_SERVICE_URL = os.environ.get('WAITLIST_SERVICE_URL', "http://waitlist-service:5001")
NOTIF_SERVICE_URL = os.environ.get('NOTIF_SERVICE_URL', "http://notifications-service:5003")

# --- Part A: Display Available Jobs ---
@app.route('/available-jobs', methods=['GET'])
def get_available_jobs():
    # Call Job Service to get open jobs
    # Update your Job Service to have a /jobs/open endpoint
    resp = requests.get(f"{JOBS_SERVICE_URL}/jobs/open")
    if resp.status_code != 200:
        return jsonify({"error": "Could not retrieve jobs"}), 500
    return jsonify(resp.json()), 200

# --- Part B: Join Waitlist Flow ---
@app.route('/join-waitlist', methods=['POST'])
def join_waitlist_flow():
    data = request.get_json()
    event_id = data.get('EventID')
    freelancer_id = data.get('FreelancerID')

    # 1. Create Waitlist Row via Atomic Waitlist Service
    wl_payload = {
        "EventID": event_id,
        "FreelancerID": freelancer_id,
        "WaitlistStatus": "Pending" # Overriding default if necessary
    }
    wl_resp = requests.post(f"{WAITLIST_SERVICE_URL}/waitlist", json=wl_payload)
    
    if wl_resp.status_code != 201:
        return jsonify({"error": "Failed to join waitlist"}), 500

    # 2. Send Confirmation via Atomic Notification Service
    notif_payload = {
        "userID": freelancer_id,
        "eventID": event_id,
        "message": "You have been successfully added to the waitlist (Pending)!"
    }
    requests.post(f"{NOTIF_SERVICE_URL}/notifications/waitlist-joined", json=notif_payload)

    # 3. Return Success to UI
    return jsonify({"success": True, "message": "Waitlist request submitted"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=True)