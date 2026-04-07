from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Ensure these match your docker-compose service names
USER_SERVICE_URL = os.environ.get('USER_SERVICE_URL')
JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004") 
NOTIF_SERVICE_URL = os.environ.get('NOTIF_SERVICE_URL', "http://notifications-service:5003")

@app.route('/post-job', methods=['POST'])
def post_job_flow():
    data = request.get_json()
    # Postman sends 'userID' (lowercase 'u'), we must match that
    user_id = data.get('userID')

    # 1. Verify Client exists in OutSystems
    try:
        user_resp = requests.get(f"{USER_SERVICE_URL}/UserAPI/users/{user_id}/client-profile")
        user_data = user_resp.json()
        
        if user_resp.status_code != 200 or not user_data.get("Success"):
            return jsonify({
                "error": "User validation failed", 
                "message": user_data.get("Message", "Client not found in OutSystems")
            }), 400
    except Exception as e:
        return jsonify({"error": f"OutSystems Connection Error: {str(e)}"}), 500

    # 2. HTTP POST to Atomic Job Service
    # CRITICAL: Keys here must match the .get() calls in the Atomic Service
    job_payload = {
        "ClientID": user_id,
        "EventType": data.get('eventType'),
        "EventWage": data.get('eventWage'),
        "EventStatus": "Open",
        "EventStartDate": data.get('startDate'),
        "EventDueDate": data.get('dueDate')
    }
    
    try:
        job_resp = requests.post(f"{JOBS_SERVICE_URL}/jobs", json=job_payload)
        
        if job_resp.status_code != 201:
            # This captures the 500 error from the atomic service
            return jsonify({
                "error": "Failed to create job entry in Atomic Service",
                "details": job_resp.text
            }), 500
            
        event_id = job_resp.json().get('EventID')
    except Exception as e:
        return jsonify({"error": f"Job Service Connection Error: {str(e)}"}), 500

    # 3. Notification Service
    notif_payload = {
        "UserID": user_id,
        "EventID": event_id,
        "Message": f"Your {data.get('eventType')} job has been posted successfully!",
        "Type": "Job Posting"
    }
    requests.post(f"{NOTIF_SERVICE_URL}/notifications", json=notif_payload)

    return jsonify({
        "status": "Job Posted Successfully",
        "EventID": event_id,
        "ClientName": user_data.get("UserName")
    }), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)