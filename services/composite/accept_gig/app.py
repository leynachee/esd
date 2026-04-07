from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

USER_SERVICE_URL = os.environ.get('USER_SERVICE_URL')
WAITLIST_SERVICE_URL = os.environ.get('WAITLIST_SERVICE_URL', "http://waitlist-service:5001")
JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004")
PAYMENT_SERVICE_URL = os.environ.get('PAYMENT_SERVICE_URL', "http://payment-service:5002")
NOTIF_SERVICE_URL = os.environ.get('NOTIF_SERVICE_URL', "http://notifications-service:5003")

@app.route('/accept-freelancer', methods=['POST'])
def accept_freelancer_flow():
    data = request.get_json()
    freelancer_id = data.get('UserID')
    event_id = data.get('EventID')
    waitlist_id = data.get('WaitlistID')

    try:
        # 1. Fetch Bank Details from OutSystems (Required for Payment Service)
        # Using Query String format as per your API doc: ?UserId={UserId}
        bank_resp = requests.get(f"{USER_SERVICE_URL}/UserAPI/GetBankDetails?UserId={freelancer_id}")
        bank_data = bank_resp.json()
        
        if not bank_data.get("Success"):
            return jsonify({"error": "Could not retrieve freelancer bank details from OutSystems"}), 400

        # 2. Update Waitlist Status to 'Accepted'
        wl_resp = requests.put(f"{WAITLIST_SERVICE_URL}/waitlist/{waitlist_id}", 
                               json={"WaitlistStatus": "Accepted"})
        
        # 3. Update Job Service (Link Freelancer & Change Status)
        job_resp = requests.put(f"{JOBS_SERVICE_URL}/jobs/{event_id}", 
                                json={"FreelancerID": freelancer_id, "EventStatus": "In Progress"})
        
        job_details = job_resp.json() # Contains EventWage

        # 4. Trigger Payment Service with Bank Info
        pay_payload = {
            "UserID": freelancer_id,
            "EventID": event_id,
            "EventWage": job_details.get('EventWage'),
            "UserBankAccount": bank_data.get('UserBankAccount') # From OutSystems
        }
        pay_resp = requests.post(f"{PAYMENT_SERVICE_URL}/charge", json=pay_payload)

        # 5. Send Acceptance Notification
        notif_payload = {
            "UserID": freelancer_id,
            "EventID": event_id,
            "Message": "Congratulations! You have been accepted for the job!",
            "Type": "Acceptance"
        }
        requests.post(f"{NOTIF_SERVICE_URL}/notifications", json=notif_payload)

        return jsonify({
            "status": "Success",
            "message": f"Freelancer {freelancer_id} accepted and payment record created.",
            "payment_info": pay_resp.json()
        }), 200

    except Exception as e:
        return jsonify({"error": f"Acceptance Orchestration failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082, debug=True)