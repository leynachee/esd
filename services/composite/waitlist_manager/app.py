from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json, pika, amqp_setup
from invokes import invoke_http

app = Flask(__name__)
CORS(app)

JOBS_SERVICE_URL = os.environ.get('JOBS_SERVICE_URL', "http://jobs-service:5004")
WAITLIST_SERVICE_URL = os.environ.get('WAITLIST_SERVICE_URL', "http://waitlist-service:5001")

@app.route('/available-jobs', methods=['GET'])
def get_available_jobs():
    print(f"\n--- Fetching available jobs from {JOBS_SERVICE_URL}/jobs/open ---")
    
    # 1. Call the Atomic Job Service
    result, code = invoke_http(f"{JOBS_SERVICE_URL}/jobs/open", method='GET')
    
    if code not in range(200, 300):
        return jsonify({
            "code": code,
            "message": "Failed to retrieve available jobs from the job service.",
            "data": result
        }), code
        
    return jsonify({
        "code": 200,
        "data": result
    }), 200
    
@app.route('/waitlist/<int:event_id>', methods=['GET'])
def get_waitlist_entries(event_id):
    result, code = invoke_http(f"{WAITLIST_SERVICE_URL}/waitlist/event/{event_id}", method='GET')
    if code not in range(200, 300):
        return jsonify({"code": code, "message": "Failed to fetch waitlist entries"}), code
    return jsonify({"code": 200, "data": result}), 200

@app.route('/join-waitlist', methods=['POST'])
def join_waitlist_flow():
    data = request.get_json()
    e_id, f_id = data.get('EventID'), data.get('FreelancerID')

    # 1. Join Waitlist (invoke_http)
    wl_payload = {"EventID": e_id, "FreelancerID": f_id, "WaitlistStatus": "Pending"}
    wl_resp, code = invoke_http(f"{WAITLIST_SERVICE_URL}/waitlist", method='POST', json=wl_payload)
    
    if code != 201:
        return jsonify({"error": "Failed to join waitlist"}), 500

    # 2. Notification (Using RabbitMQ)
    try:
        connection = pika.BlockingConnection(amqp_setup.parameters)
        channel = connection.channel()
        channel.exchange_declare(exchange=amqp_setup.ex_name, exchange_type='topic', durable=True)
        notif_payload = {"UserID": f_id, "EventID": e_id, "Message": "Joined waitlist!", "Type": "Waitlist"}
        channel.basic_publish(exchange=amqp_setup.ex_name, routing_key="waitlist.info", 
                              body=json.dumps(notif_payload), properties=pika.BasicProperties(delivery_mode=2))
        connection.close()
    except Exception as e:
        print(f"Notification Queue Error: {e}")

    return jsonify({"success": True, "message": "Waitlist request submitted"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=True)