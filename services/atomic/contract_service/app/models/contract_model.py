from app import db


class Contract(db.Model):
    """
    Represents a gig contract between a client and a freelancer.
    Created in Scenario 3 after escrow payment is confirmed.
    Each contract is unique per event + user (composite key).
    """
    __tablename__ = "contracts"

    # --- Primary Key ---
    # Auto-generated unique ID for each contract (Supabase: int4)
    ContractID      = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # --- Core Fields ---
    # EventID: which gig/job this contract is for (Supabase: int8)
    EventID         = db.Column(db.BigInteger, nullable=False)

    # UserID: which freelancer is being contracted (Supabase: int8)
    UserID          = db.Column(db.BigInteger, nullable=False)

    # EventWage: how much the freelancer will be paid (Supabase: float8)
    EventWage       = db.Column(db.Float, nullable=False)

    # UserBankAccount: freelancer's bank account to receive payment
    UserBankAccount = db.Column(db.String(100), nullable=False)

    # --- Timestamps ---
    CreatedAt       = db.Column(db.DateTime, server_default=db.func.now())
    UpdatedAt       = db.Column(db.DateTime, server_default=db.func.now(),
                                onupdate=db.func.now())

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
            "CreatedAt":       self.CreatedAt.isoformat() + "Z" if self.CreatedAt else None,
            "UpdatedAt":       self.UpdatedAt.isoformat() + "Z" if self.UpdatedAt else None,
        }