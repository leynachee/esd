import os
from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# Configuration - Replace with your actual Supabase URL and Key
# Typically these are stored in environment variables for security
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

### --- API Endpoints --- ###

# 1. Create Escrow Payment (Triggered by Orchestrator Step 6)
@app.route("/payment", methods=['POST'])
def create_escrow_payment():
    data = request.get_json()
    
    # Extract keys from request body
    event_id = data.get('EventID')
    user_id = data.get('UserID')
    event_wage = data.get('EventWage')
    user_bank_account = data.get('UserBankAccount')

    # Step A: Check if record already exists
    # .execute() returns a response object; .data contains the list of results
    existing = supabase.table("Payment") \
        .select("*") \
        .eq("EventID", event_id) \
        .eq("UserID", user_id) \
        .execute()

    if existing.data:
        return jsonify({
            "code": 400,
            "message": "Payment record already exists for this event and freelancer."
        }), 400

    # Step B: Insert the new record
    try:
        response = supabase.table("Payment").insert({
            "EventID": event_id,
            "UserID": user_id,
            "EventWage": event_wage,
            "UserBankAccount": user_bank_account
        }).execute()
        
        return jsonify({
            "code": 201,
            "data": response.data[0],
            "message": "Escrow payment record created successfully."
        }), 201

    except Exception as e:
        return jsonify({
            "code": 500,
            "message": f"An error occurred while creating the escrow payment: {str(e)}"
        }), 500


# 2. Return Payment Result (Triggered by Orchestrator Step 7)
@app.route("/payment/<int:event_id>/<int:user_id>", methods=['GET'])
def get_payment_result(event_id, user_id):
    try:
        response = supabase.table("Payment") \
            .select("*") \
            .eq("EventID", event_id) \
            .eq("UserID", user_id) \
            .maybe_single() \
            .execute()

        if response.data:
            return jsonify({
                "code": 200,
                "data": response.data
            }), 200
        
        return jsonify({
            "code": 404,
            "message": "Payment record not found."
        }), 404
    
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)}), 500


if __name__ == '__main__':
    # Running on 5001 for microservice isolation
    app.run(port=5001, debug=True)