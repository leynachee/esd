# Use a slim Python image
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY app.py .

# Expose the port (Update this per service if needed)
EXPOSE 5001

CMD ["python", "app.py"]