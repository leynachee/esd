import pika
import os

hostname = os.environ.get('RABBIT_HOST') or "localhost"
port = 5672

# Standardize these for all services
ex_name = "service_topic"
ex_type = "topic"

# Connection Parameters
parameters = pika.ConnectionParameters(host=hostname, port=port, heartbeat=3600, blocked_connection_timeout=3600)

def check_setup():
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # Declare Exchange
    channel.exchange_declare(exchange=ex_name, exchange_type=ex_type, durable=True)

    # Dead Letter Exchange setup
    channel.exchange_declare(exchange='dead_letter_ex', exchange_type='topic', durable=True)
    channel.queue_declare(queue='Error_Queue', durable=True)
    channel.queue_bind(exchange='dead_letter_ex', queue='Error_Queue', routing_key='#')

    # Main Queues with DLX arguments
    main_queue_args = {
        'x-dead-letter-exchange': 'dead_letter_ex',
        'x-dead-letter-routing-key': 'service.error'
    }

    # Declare and Bind Payment Queue
    channel.queue_declare(queue='Payment_Queue', durable=True, arguments=main_queue_args)
    channel.queue_bind(exchange=ex_name, queue='Payment_Queue', routing_key='payment.new')

    # Declare and Bind Notification Queue
    channel.queue_declare(queue='Notification_Queue', durable=True, arguments=main_queue_args)
    channel.queue_bind(exchange=ex_name, queue='Notification_Queue', routing_key='*.info')

    print("RabbitMQ Setup Complete.")
    connection.close()

if __name__ == "__main__":
    check_setup()