from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json, pika, amqp_setup
from invokes import invoke_http

app = Flask(__name__)
CORS(app)

USER_SERVICE_URL = os.environ.get('USER_SERVICE_URL')
JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004") 

@app.route('/post-job', methods=['POST'])
def post_job_flow():
    data = request.get_json()
    user_id = data.get('userID')

    # 1. Verify Client (Using invoke_http)
    user_resp, code = invoke_http(f"{USER_SERVICE_URL}/UserAPI/users/{user_id}/client-profile", method='GET')
    
    if code != 200 or not user_resp.get("Success"):
        return jsonify({"error": "User validation failed", "message": user_resp.get("Message")}), 400

    # 2. Create Job (invoke_http)
    job_payload = {
        "ClientID": user_id,
        "EventType": data.get('eventType'),
        "EventWage": data.get('eventWage'),
        "EventStatus": "Open",
        "EventStartDate": data.get('startDate'),
        "EventDueDate": data.get('dueDate')
    }
    
    job_resp, code = invoke_http(f"{JOBS_SERVICE_URL}/jobs", method='POST', json=job_payload)
    
    if code != 201:
        return jsonify({"error": "Failed to create job entry", "details": job_resp}), 500
            
    event_id = job_resp.get('EventID')

    # 3. Notification (Using RabbitMQ)
    try:
        connection = pika.BlockingConnection(amqp_setup.parameters)
        channel = connection.channel()
        channel.exchange_declare(exchange=amqp_setup.ex_name, exchange_type='topic', durable=True)
        notif_payload = {
            "UserID": user_id, "EventID": event_id,
            "Message": f"Your {data.get('eventType')} job has been posted successfully!",
            "Type": "Job Posting"
        }
        channel.basic_publish(exchange=amqp_setup.ex_name, routing_key="job.info", 
                              body=json.dumps(notif_payload), properties=pika.BasicProperties(delivery_mode=2))
        connection.close()
    except Exception as e:
        print(f"Notification Queue Error: {e}")

    return jsonify({"status": "Job Posted Successfully", "EventID": event_id}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)