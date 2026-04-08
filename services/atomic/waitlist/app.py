from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
db = SQLAlchemy(app)

class Waitlist(db.Model):
    __tablename__ = 'waitlist'
    WaitlistID = db.Column(db.Integer, primary_key=True)
    EventID = db.Column(db.BigInteger, nullable=False)
    FreelancerID = db.Column(db.BigInteger, nullable=False)
    WaitlistStatus = db.Column(db.String(50), default='Waitlisted')

@app.route('/waitlist/event/<int:event_id>', methods=['GET'])
def get_waitlist_by_event(event_id):
    entries = Waitlist.query.filter_by(EventID=event_id).all()
    return jsonify([{
        "WaitlistID": e.WaitlistID,
        "EventID": e.EventID,
        "FreelancerID": e.FreelancerID,
        "WaitlistStatus": e.WaitlistStatus
    } for e in entries]), 200

@app.route('/waitlist', methods=['POST'])
def create_waitlist():
    data = request.get_json()
    new_entry = Waitlist(
        EventID=data['EventID'],
        FreelancerID=data['FreelancerID'],
        WaitlistStatus=data.get('WaitlistStatus', 'Pending') # Default to Pending
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"success": True}), 201

@app.route('/waitlist/<int:wl_id>', methods=['PUT'])
def update_waitlist(wl_id):
    data = request.get_json()
    entry = Waitlist.query.get(wl_id)
    if not entry:
        return jsonify({"error": "Not found"}), 404
    entry.WaitlistStatus = data.get('WaitlistStatus')
    db.session.commit()
    return jsonify({"success": True}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)