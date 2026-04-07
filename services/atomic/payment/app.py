from flask import Flask, request, jsonify
import stripe
import os

app = Flask(__name__)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@app.route('/charge', methods=['POST'])
def create_charge():
    data = request.get_json()
    wage = data.get('EventWage', 0) # Default to 0 if missing
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(float(wage) * 100), 
            currency='sgd',
            metadata={'EventID': data['EventID'], 'UserID': data['UserID']}
        )
        return jsonify({"status": "success", "client_secret": intent.client_secret}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)