from app import db
from app.models.contract_model import Contract
from sqlalchemy.exc import IntegrityError

REQUIRED_FIELDS = [
    "event_id", "user_id",
    "event_wage", "user_bank_account"
]

def validate_payload(data: dict):
    """Check all required fields exist and are valid."""
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in (None, ""):
            return f"Missing required field: {field}"
    if float(data.get("event_wage", 0)) <= 0:
        return "event_wage must be greater than 0"
    return None


def create_contract(data: dict):
    """
    Creates a new contract and saves it to DB.
    Returns (result_dict, http_status_code).
    """
    # Idempotency: return existing contract if already created
    existing = Contract.query.filter_by(
        event_id=data["event_id"],
        user_id=data["user_id"]
    ).first()

    if existing:
        result = existing.to_dict()
        result["message"] = "Contract already exists for this event and user."
        return result, 200

    # Create new contract
    contract = Contract(
        event_id          = data["event_id"],
        user_id           = data["user_id"],
        event_wage        = data["event_wage"],
        user_bank_account = data["user_bank_account"],
        status            = "ACTIVE"
    )

    try:
        db.session.add(contract)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        existing = Contract.query.filter_by(
            event_id=data["event_id"],
            user_id=data["user_id"]
        ).first()
        return existing.to_dict(), 200

    return contract.to_dict(), 201


def get_contract_by_id(contract_id: int):
    """Fetch one contract by its ID."""
    contract = Contract.query.get(contract_id)
    if not contract:
        return {"error": "Contract not found"}, 404
    return contract.to_dict(), 200


def get_contracts_by_event(event_id: int):
    """Fetch all contracts for a given event."""
    contracts = Contract.query.filter_by(event_id=event_id).all()
    return [c.to_dict() for c in contracts]