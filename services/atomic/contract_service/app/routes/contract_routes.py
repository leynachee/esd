from flask import Blueprint, request, jsonify
from app.services.contract_service import (
    create_contract,
    get_contract_by_id,
    get_contracts_by_event,
    get_contracts_by_user,
    validate_payload
)

# Blueprint groups all contract-related routes together
# Registered in app/__init__.py
contract_bp = Blueprint("contracts", __name__)


@contract_bp.route("/contract/health", methods=["GET"])
def health():
    """
    Health check endpoint.
    Used by Docker and teammates to verify the service is running.
    Usage: GET /contract/health
    """
    return jsonify({
        "status":  "ok",
        "service": "contract-service",
        "port":    5000
    }), 200


@contract_bp.route("/contracts", methods=["POST"])
def create():
    """
    Creates a new gig contract.
    Called by Accept Gig orchestrator in Scenario 3 Step 8,
    after escrow payment is confirmed by Payment Service.

    Expected JSON body:
    {
        "EventID": 101,
        "UserID": 42,
        "EventWage": 500.00,
        "UserBankAccount": "DBS-9876543210"
    }

    Returns 201 if created, 200 if already exists (idempotency).
    """
    data = request.get_json(silent=True)

    # Guard: request body must be valid JSON
    if not data:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    # Guard: validate all required fields
    error = validate_payload(data)
    if error:
        return jsonify({"error": error}), 400

    result, status_code = create_contract(data)
    return jsonify(result), status_code


@contract_bp.route("/contracts/<int:contract_id>", methods=["GET"])
def get_by_id(contract_id):
    """
    Fetches a single contract by its ContractID.
    Usage: GET /contracts/1
    Returns 404 if contract does not exist.
    """
    result, status_code = get_contract_by_id(contract_id)
    return jsonify(result), status_code


@contract_bp.route("/contracts", methods=["GET"])
def get_by_event():
    """
    Fetches all contracts for a given event.
    Useful for checking all freelancers contracted under one event.
    Usage: GET /contracts?EventID=101
    Returns 400 if EventID query param is missing.
    """
    event_id = request.args.get("EventID", type=int)
    if not event_id:
        return jsonify({"error": "Query param 'EventID' is required"}), 400
    contracts = get_contracts_by_event(event_id)
    return jsonify(contracts), 200


@contract_bp.route("/contracts/user/<int:user_id>", methods=["GET"])
def get_by_user(user_id):
    """
    Fetches all contracts for a given freelancer (UserID).
    Useful for the dashboard 'Gigs I'm Working On' section.
    Usage: GET /contracts/user/42
    """
    contracts = get_contracts_by_user(user_id)
    return jsonify(contracts), 200