from flask import Blueprint, request, jsonify
from app.services.contract_service import (
    create_contract,
    get_contract_by_id,
    get_contracts_by_event,
    validate_payload
)

contract_bp = Blueprint("contracts", __name__)


@contract_bp.route("/health", methods=["GET"])
def health():
    """Quick check that the service is alive."""
    return jsonify({"status": "ok", "service": "contract-service"}), 200


@contract_bp.route("/contracts", methods=["POST"])
def create():
    """
    Called by Accept Gig orchestrator — Scenario 3 Step 8.
    Creates a gig contract after escrow payment is confirmed.
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    error = validate_payload(data)
    if error:
        return jsonify({"error": error}), 400

    result, status_code = create_contract(data)
    return jsonify(result), status_code


@contract_bp.route("/contracts/<int:contract_id>", methods=["GET"])
def get_by_id(contract_id):
    """Fetch a single contract by its ID."""
    result, status_code = get_contract_by_id(contract_id)
    return jsonify(result), status_code


@contract_bp.route("/contracts", methods=["GET"])
def get_by_event():
    """
    Fetch all contracts for an event.
    Usage: GET /contracts?event_id=101
    """
    event_id = request.args.get("event_id", type=int)
    if not event_id:
        return jsonify({"error": "Query param 'event_id' is required"}), 400
    contracts = get_contracts_by_event(event_id)
    return jsonify(contracts), 200