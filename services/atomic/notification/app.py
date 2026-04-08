import pika
import json
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import amqp_setup
import time

# 1. Database Setup
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Notification(db.Model):
    __tablename__ = 'notifications'
    NotificationID = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    UserID = db.Column(db.BigInteger, nullable=False)
    EventID = db.Column(db.BigInteger)
    Message = db.Column(db.Text, nullable=False)
    Type = db.Column(db.String(100))
    IsRead = db.Column(db.Boolean, default=False)
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

# 2. Updated Callback
def callback(ch, method, properties, body):
    try:
        print("\n[NOTIFICATION RECEIVED]")
        data = json.loads(body)
        
        with app.app_context():
            new_notif = Notification(
                UserID=data.get('UserID'),
                EventID=data.get('EventID'),
                Message=data.get('Message'),
                Type=data.get('Type', 'General')
            )
            db.session.add(new_notif)
            db.session.commit()
            print(f"Successfully saved notification for User {data.get('UserID')}")

        # Acknowledge success to RabbitMQ
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        print(f"Notification processing failed: {e}")
        # Send to Error Queue (DLX) instead of crashing
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

# 3. Start the Consumer
def start_notifications():
    print("Connecting to RabbitMQ...")
    connection = None
    while connection is None:
        try:
            connection = pika.BlockingConnection(amqp_setup.parameters)
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ not ready, retrying in 5 seconds...")
            time.sleep(5)    
            
    channel = connection.channel()
    
    # Declare the Topic Exchange
    channel.exchange_declare(exchange=amqp_setup.ex_name, exchange_type='topic', durable=True)

    # Dead Letter Exchange Configuration
    main_queue_args = {
        'x-dead-letter-exchange': 'dead_letter_ex',
        'x-dead-letter-routing-key': 'service.error'
    }
    
    # Declare and Bind
    channel.queue_declare(queue="Notification_Queue", durable=True, arguments=main_queue_args)
    channel.queue_bind(exchange=amqp_setup.ex_name, queue="Notification_Queue", routing_key="*.info")

    # Set prefetch to 1 so the worker isn't overwhelmed
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue="Notification_Queue", on_message_callback=callback)

    print("Notification Service is waiting for events. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == '__main__':
    start_notifications()