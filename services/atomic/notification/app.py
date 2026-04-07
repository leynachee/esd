from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- ERD Model Mapping ---
class Notification(db.Model):
    __tablename__ = 'notifications'
    NotificationID = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    UserID = db.Column(db.BigInteger, nullable=False)
    EventID = db.Column(db.BigInteger)
    Message = db.Column(db.Text, nullable=False)
    Type = db.Column(db.String(100))
    IsRead = db.Column(db.Boolean, default=False)
    CreatedAt = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

    def to_dict(self):
        return {
            "NotificationID": self.NotificationID,
            "UserID": str(self.UserID),
            "EventID": self.EventID,
            "Message": self.Message,
            "Type": self.Type,
            "IsRead": self.IsRead,
            "CreatedAt": self.CreatedAt.isoformat()
        }

# --- Shared Logic Helper ---
def create_notification_entry(data, message, notif_type):
    try:
        # Use .get() with Capitalized keys to match your class/DB
        new_notif = Notification(
            UserID=data.get('UserID') or data.get('userID'),
            EventID=data.get('EventID') or data.get('eventID'),
            Message=message,
            Type=notif_type
        )
        db.session.add(new_notif)
        db.session.commit()
        return jsonify({"success": True, "notification": new_notif.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        print(f"NOTIF ERROR: {str(e)}") # Check docker logs for this!
        return jsonify({"error": str(e)}), 500

# --- Routes (Matching your Node.js logic) ---
@app.route('/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    new_notif = Notification(
        UserID=data.get('UserID'),
        EventID=data.get('EventID'),
        Message=data.get('Message'),
        Type=data.get('Type')
    )
    db.session.add(new_notif)
    db.session.commit()
    return jsonify({"success": True}), 201

@app.route('/notifications/job-created', methods=['POST'])
def job_created():
    data = request.get_json()
    msg = data.get('Message') or data.get('message') or 'Your job post has been created successfully!'
    u_id = data.get('UserID') or data.get('userID')
    e_id = data.get('EventID') or data.get('eventID')
    return create_notification_entry(u_id, e_id, msg, 'job-created')

@app.route('/notifications/waitlist-joined', methods=['POST'])
def waitlist_joined():
    data = request.get_json()
    msg = data.get('Message') or data.get('message') or 'You have been successfully added to the waitlist!'
    u_id = data.get('UserID') or data.get('userID')
    e_id = data.get('EventID') or data.get('eventID')
    return create_notification_entry(u_id, e_id, msg, 'waitlist-joined')

@app.route('/notifications/job-accepted', methods=['POST'])
def job_accepted():
    data = request.get_json()
    msg = data.get('Message') or data.get('message') or 'Congratulations! You have been accepted for the job!'
    u_id = data.get('UserID') or data.get('userID')
    e_id = data.get('EventID') or data.get('eventID')
    return create_notification_entry(u_id, e_id, msg, 'job-accepted')

if __name__ == '__main__':
    # Defaulting to 5003 for the Notifications Service
    app.run(host='0.0.0.0', port=5003, debug=True)