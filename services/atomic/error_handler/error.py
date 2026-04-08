import pika, json, amqp_setup, time

def callback(ch, method, properties, body):
    print("\n--- [CENTRAL ERROR LOG] ---")
    try:
        message = json.loads(body)
        print(f"Details: {message}")
        # In a real app, write to a .txt file here
        with open("error_log.txt", "a") as f:
            f.write(f"Routing Key: {method.routing_key} | Data: {body}\n")
    except Exception as e:
        print(f"Error logging failed: {e}")
    ch.basic_ack(delivery_tag=method.delivery_tag)
    
def start_error_service():
    connection = None
    # Retry loop to wait for RabbitMQ
    while connection is None:
        try:
            connection = pika.BlockingConnection(amqp_setup.parameters)
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ not ready, retrying in 5 seconds...")
            time.sleep(5)    
    channel = connection.channel()
    channel.exchange_declare(exchange='dead_letter_ex', exchange_type='topic', durable=True)
    channel.queue_declare(queue="Error_Queue", durable=True)
    channel.queue_bind(exchange='dead_letter_ex', queue='Error_Queue', routing_key='#')
    channel.basic_consume(queue="Error_Queue", on_message_callback=callback)
    print("Error Service monitoring queues...")
    channel.start_consuming()

if __name__ == "__main__":
    start_error_service()