from datetime import datetime
from app import db

class Contract(db.Model):
    __tablename__ = "contracts"

    contract_id       = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id          = db.Column(db.Integer, nullable=False)
    user_id           = db.Column(db.Integer, nullable=False)
    event_wage        = db.Column(db.Numeric(10, 2), nullable=False)
    user_bank_account = db.Column(db.String(100), nullable=False)
    status            = db.Column(db.String(20), nullable=False, default="ACTIVE")
    created_at        = db.Column(db.DateTime, default=datetime.now)
    updated_at        = db.Column(db.DateTime, default=datetime.now,
                                  onupdate=datetime.now)

    __table_args__ = (
        db.UniqueConstraint("event_id", "user_id",
                            name="uq_event_user"),
    )

    def to_dict(self):
        return {
            "contract_id":       self.contract_id,
            "event_id":          self.event_id,
            "user_id":           self.user_id,
            "event_wage":        float(self.event_wage),
            "user_bank_account": self.user_bank_account,
            "payment_reference": self.payment_reference,
            "status":            self.status,
            "created_at":        self.created_at.isoformat() + "Z",
        }