import pika
import json
import stripe
import os
from flask import Flask
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

        # Save to Supabase 
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