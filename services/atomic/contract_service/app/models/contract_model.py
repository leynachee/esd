from datetime import datetime
from app import db

class Contract(db.Model):
    """
    Represents a gig contract between a client and a freelancer.
    Created in Scenario 3 after escrow payment is confirmed.
    Each contract is unique per event + user (composite key).
    """
    __tablename__ = "contracts"

    # --- Primary Key ---
    # Auto-generated unique ID for each contract
    ContractID      = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # --- Core Fields ---
    # EventID: which gig/job this contract is for (references Job Service)
    EventID         = db.Column(db.Integer, nullable=False)

    # UserID: which freelancer is being contracted (references User Service)
    UserID          = db.Column(db.Integer, nullable=False)

    # EventWage: how much the freelancer will be paid
    EventWage       = db.Column(db.Numeric(10, 2), nullable=False)

    # UserBankAccount: freelancer's bank account to receive payment
    UserBankAccount = db.Column(db.String(100), nullable=False)

    # --- Timestamps ---
    CreatedAt       = db.Column(db.DateTime, default=datetime.now)
    UpdatedAt       = db.Column(db.DateTime, default=datetime.now,
                                onupdate=datetime.now)

    __table_args__ = (
        db.UniqueConstraint("EventID", "UserID", name="uq_event_user"),
    )

    def to_dict(self):
        """
        Converts the Contract object into a dictionary.
        Used by Flask to return JSON responses.
        """
        return {
            "ContractID":      self.ContractID,
            "EventID":         self.EventID,
            "UserID":          self.UserID,
            "EventWage":       float(self.EventWage),
            "UserBankAccount": self.UserBankAccount,
            "CreatedAt":       self.CreatedAt.isoformat() + "Z",
        }