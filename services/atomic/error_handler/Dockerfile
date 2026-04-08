FROM python:3.9-slim

# Install system dependencies needed for some Python packages (like psycopg2)
RUN apt-get update && apt-get install -y \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files (including error.py and amqp_setup.py)
COPY . .

# Use -u to see python logs in real-time in Docker terminal
CMD [ "python", "-u", "./error.py" ]