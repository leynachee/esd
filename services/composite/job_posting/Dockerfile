FROM python:3.9-slim

# Necessary if you use psycopg2 for Supabase
RUN apt-get update && apt-get install -y \
    python3-dev \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# This line is key: it copies app.py AND amqp_setup.py into the image
COPY . .

# -u ensures you see "RabbitMQ not ready" logs immediately
CMD [ "python", "-u", "./app.py" ]