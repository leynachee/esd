from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Job(db.Model):
    __tablename__ = 'jobs'
    EventID = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    ClientID = db.Column(db.BigInteger, nullable=False)
    FreelancerID = db.Column(db.BigInteger, nullable=True)
    EventType = db.Column(db.String(255))
    EventWage = db.Column(db.Float)
    EventStatus = db.Column(db.String(50))
    EventStartDate = db.Column(db.Date)
    EventDueDate = db.Column(db.Date)

    def to_dict(self):
        return {
            "EventID": self.EventID,
            "ClientID": self.ClientID,
            "FreelancerID": self.FreelancerID,
            "EventType": self.EventType,
            "EventWage": self.EventWage,
            "EventStatus": self.EventStatus,
            "EventStartDate": str(self.EventStartDate),
            "EventDueDate": str(self.EventDueDate)
        }

@app.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    try:
        new_job = Job(
            ClientID=data.get('ClientID'),
            EventType=data.get('EventType'),
            EventWage=data.get('EventWage'),
            EventStatus=data.get('EventStatus', 'Open'),
            EventStartDate=data.get('EventStartDate'),
            EventDueDate=data.get('EventDueDate')
        )
        db.session.add(new_job)
        db.session.commit()
        # Return the ID so the Orchestrator can use it
        return jsonify({"EventID": new_job.EventID}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/jobs/open', methods=['GET'])
def get_open_jobs():
    open_jobs = Job.query.filter_by(EventStatus='Open').all()
    return jsonify([job.to_dict() for job in open_jobs]), 200

@app.route('/jobs/<int:event_id>', methods=['PUT'])
def update_job(event_id):
    data = request.get_json()
    job = Job.query.get(event_id)
    if not job: 
        return jsonify({"error": "Job not found"}), 404
    
    if 'FreelancerID' in data: job.FreelancerID = data['FreelancerID']
    if 'EventStatus' in data: job.EventStatus = data['EventStatus']
    
    db.session.commit()
    return jsonify(job.to_dict()), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)