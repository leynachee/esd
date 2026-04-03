from app import db
from app.models.contract_model import Contract
from sqlalchemy.exc import IntegrityError

# All fields that MUST be present in the request body
# If any are missing, the request is rejected with a 400 error
REQUIRED_FIELDS = [
    "EventID", "UserID",
    "EventWage", "UserBankAccount"
]


def validate_payload(data: dict):
    """
    Validates the incoming request body.
    Checks that all required fields exist and EventWage is positive.
    Returns an error string if invalid, or None if all good.
    """
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in (None, ""):
            return f"Missing required field: {field}"

    # Safely check EventWage is a positive number
    try:
        wage = float(data["EventWage"])
    except (ValueError, TypeError):
        return "EventWage must be a valid number"

    if wage <= 0:
        return "EventWage must be greater than 0"

    return None


def create_contract(data: dict):
    """
    Main logic for creating a gig contract.
    Called by Scenario 3 Step 8 via the Accept Gig orchestrator,
    after escrow payment is confirmed by Payment Service.

    Steps:
    1. Check if contract already exists (idempotency)
    2. Create new contract record in DB
    3. Return the created contract

    Returns (result_dict, http_status_code)
    """

    # --- Step 1: Idempotency Check ---
    # If a contract already exists for this EventID + UserID,
    # return the existing one instead of creating a duplicate.
    # This handles cases where orchestrator retries the call.
    existing = Contract.query.filter_by(
        EventID=data["EventID"],
        UserID=data["UserID"]
    ).first()

    if existing:
        result = existing.to_dict()
        result["message"] = "Contract already exists for this event and user."
        return result, 200

    # --- Step 2: Create New Contract ---
    contract = Contract(
        EventID         = data["EventID"],
        UserID          = data["UserID"],
        EventWage       = data["EventWage"],
        UserBankAccount = data["UserBankAccount"]
    )

    try:
        db.session.add(contract)     # stage the new record
        db.session.commit()          # write to Supabase DB
    except IntegrityError:
        # Handles rare race condition where two identical requests
        # arrive at the exact same time — DB unique constraint catches it
        db.session.rollback()
        existing = Contract.query.filter_by(
            EventID=data["EventID"],
            UserID=data["UserID"]
        ).first()
        if existing:
            return existing.to_dict(), 200
        return {"error": "Failed to create contract"}, 500

    # --- Step 3: Return Created Contract ---
    return contract.to_dict(), 201


def get_contract_by_id(contract_id: int):
    """
    Fetches a single contract by its ContractID.
    Returns 404 if not found.
    """
    # db.session.get() replaces the deprecated Contract.query.get()
    contract = db.session.get(Contract, contract_id)
    if not contract:
        return {"error": "Contract not found"}, 404
    return contract.to_dict(), 200


def get_contracts_by_event(event_id: int):
    """
    Fetches all contracts belonging to a given EventID.
    Useful for checking how many freelancers were contracted for an event.
    """
    contracts = Contract.query.filter_by(EventID=event_id).all()
    return [c.to_dict() for c in contracts]


def get_contracts_by_user(user_id: int):
    """
    Fetches all contracts for a given UserID (freelancer).
    Useful for the freelancer dashboard — shows 'Gigs I'm Working On'.
    """
    contracts = Contract.query.filter_by(UserID=user_id).all()
    return [c.to_dict() for c in contracts]