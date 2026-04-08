# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy 
# import stripe
# import os

# app = Flask(__name__)

# # 1. Database Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

# # 2. Define the Model (Matches your lowercase 'payment' table)
# class Payment(db.Model):
#     __tablename__ = 'payment'
#     PaymentID = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
#     EventID = db.Column(db.BigInteger, nullable=False)
#     UserID = db.Column(db.BigInteger, nullable=False)
#     UserBankAccount = db.Column(db.String(255))
#     PaymentStatus = db.Column(db.String(50))
#     StripeIntentID = db.Column(db.String(255))

# @app.route('/charge', methods=['POST'])
# def create_charge():
#     data = request.get_json()
#     wage = data.get('EventWage', 0)
    
#     try:
#         # Create intent in Stripe
# # Create intent with automatic confirmation using a test card
#         intent = stripe.PaymentIntent.create(
#             amount=int(float(wage) * 100), 
#             currency='sgd',
#             payment_method="pm_card_visa", # Use a standard test visa
#             confirm=True,                  # Confirm it immediately
#             automatic_payment_methods={"enabled": True, "allow_redirects": "never"},
#             metadata={'EventID': data['EventID'], 'UserID': data['UserID']}
#         )

#         # 3. SAVE TO SUPABASE
#         new_payment = Payment(
#             EventID=data.get('EventID'),
#             UserID=data.get('UserID'),
#             UserBankAccount=data.get('UserBankAccount'),
#             PaymentStatus='Pending',
#             StripeIntentID=intent.id  
#         )
        
#         db.session.add(new_payment)
#         db.session.commit()

#         return jsonify({
#             "status": "success", 
#             "client_secret": intent.client_secret,
#             "payment_id": new_payment.PaymentID
#         }), 200

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"status": "error", "message": str(e)}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5002, debug=True)
import pika
import json
import stripe
import os
from flask import Flask # Optional: keep if you want a health check route
from flask_sqlalchemy import SQLAlchemy
import amqp_setup
import time

# DB Setup remains the same
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
db = SQLAlchemy(app)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

class Payment(db.Model):
    __tablename__ = 'payment'
    PaymentID = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    EventID = db.Column(db.BigInteger, nullable=False)
    UserID = db.Column(db.BigInteger, nullable=False)
    UserBankAccount = db.Column(db.String(255))
    PaymentStatus = db.Column(db.String(50))
    StripeIntentID = db.Column(db.String(255))

def callback(ch, method, properties, body):
    data = json.loads(body)
    try:
        # Create Stripe Intent
        intent = stripe.PaymentIntent.create(
            amount=int(float(data['EventWage']) * 100),
            currency='sgd',
            payment_method="pm_card_visa",
            confirm=True,
            automatic_payment_methods={"enabled": True, "allow_redirects": "never"}
        )

        # Save to Supabase (Your existing logic)
        with app.app_context():
            new_payment = Payment(
                EventID=data['EventID'],
                UserID=data['UserID'],
                UserBankAccount=data['UserBankAccount'],
                PaymentStatus='Succeeded',
                StripeIntentID=intent.id
            )
            db.session.add(new_payment)
            db.session.commit()
        
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print("Payment processed successfully.")

    except Exception as e:
        # If it fails, we route to error queue
        print(f"Payment failed: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False) # Send to DLX/Error

def start_worker():
    connection = None
    # Retry loop to wait for RabbitMQ
    while connection is None:
        try:
            connection = pika.BlockingConnection(amqp_setup.parameters)
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ not ready, retrying in 5 seconds...")
            time.sleep(5)    
    channel = connection.channel()
    channel.exchange_declare(exchange=amqp_setup.ex_name, exchange_type='topic', durable=True)
    channel.queue_declare(queue="Payment_Queue", durable=True)
    channel.queue_bind(exchange=amqp_setup.ex_name, queue="Payment_Queue", routing_key="*.payment")
    channel.basic_consume(queue="Payment_Queue", on_message_callback=callback)
    print("Payment Worker is waiting...")
    channel.start_consuming()

if __name__ == '__main__':
    start_worker()