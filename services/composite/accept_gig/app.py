from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json, pika, amqp_setup
from invokes import invoke_http

app = Flask(__name__)
CORS(app)

USER_SERVICE_URL = os.environ.get('USER_SERVICE_URL')
WAITLIST_SERVICE_URL = os.environ.get('WAITLIST_SERVICE_URL', "http://waitlist-service:5001")
JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004")

@app.route('/accept-freelancer', methods=['POST'])
def accept_freelancer_flow():
    data = request.get_json()
    f_id, e_id, w_id = data.get('UserID'), data.get('EventID'), data.get('WaitlistID')

    # 1. Fetch Bank Details
    bank_resp, code = invoke_http(f"{USER_SERVICE_URL}/UserAPI/GetBankDetails?UserId={f_id}")
    if code != 200 or not bank_resp.get("Success"):
        return jsonify({"error": "Bank details not found"}), 400

    # 2. Update Waitlist & Jobs
    invoke_http(f"{WAITLIST_SERVICE_URL}/waitlist/{w_id}", method='PUT', json={"WaitlistStatus": "Accepted"})
    job_resp, code = invoke_http(f"{JOBS_SERVICE_URL}/jobs/{e_id}", method='PUT', 
                                json={"FreelancerID": f_id, "EventStatus": "In Progress"})
    
    if code != 200:
        return jsonify({"error": "Failed to update job status"}), 500

    # 3. Publish to RabbitMQ
    try:
        connection = pika.BlockingConnection(amqp_setup.parameters)
        channel = connection.channel()
        channel.exchange_declare(exchange=amqp_setup.ex_name, exchange_type='topic', durable=True)
        pay_msg = {"UserID": f_id, "EventID": e_id, "EventWage": job_resp.get('EventWage'), "UserBankAccount": bank_resp.get('UserBankAccount')}
        notif_msg = {"UserID": f_id, "Message": "You've been hired!", "Type": "Acceptance"}
        channel.basic_publish(exchange=amqp_setup.ex_name, routing_key="payment.new", body=json.dumps(pay_msg), properties=pika.BasicProperties(delivery_mode=2))
        channel.basic_publish(exchange=amqp_setup.ex_name, routing_key="acceptance.info", body=json.dumps(notif_msg), properties=pika.BasicProperties(delivery_mode=2))
        connection.close()
    except Exception as e:
        print(f"MQ Error: {e}")

    return jsonify({"status": "Success", "message": "Hiring process complete."}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082, debug=True)