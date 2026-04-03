import stripe
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv  

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = Flask(__name__)

# --- SCENARIO 3: Create Escrow & Payout (Client Accepts Freelancer) ---
# Aligned with Diagram Step 6: Create Escrow Payment
# Aligned with ERD: Payment Table (EventID, UserID, EventWage, UserBankAccount)
@app.route('/payments/finalize-gig', methods=['POST'])
def finalize_gig():
    data = request.json
    
    # Extracting exact fields from Diagram/ERD
    job_id = data.get('JobID')
    event_id = data.get('EventID')
    user_id = data.get('UserID')  # Freelancer receiving payment
    event_wage = data.get('EventWage')
    user_bank_account = data.get('UserBankAccount') # From ERD Payment table

    try:
        # 1. Calculate Payout in cents for Stripe
        amount_cents = int(float(event_wage) * 100)

        # 2. In a real scenario, you'd capture an existing Intent. 
        # Following the diagram's "Create Escrow" logic:
        # We create a transfer to the Freelancer (Destination)
        transfer = stripe.Transfer.create(
            amount=amount_cents,
            currency="usd",
            destination=user_bank_account, # Maps to Freelancer's Stripe Account
            metadata={
                "JobID": job_id,
                "EventID": event_id,
                "UserID": user_id
            }
        )

        # Diagram Step 7: Return Payment Result
        return jsonify({
            "status": "success",
            "code": 201,
            "data": {
                "TransferID": transfer.id,
                "EventID": event_id,
                "UserID": user_id,
                "Amount": event_wage
            }
        }), 201

    except Exception as e:
        return jsonify({
            "status": "failed", 
            "message": str(e)
        }), 500

if __name__ == '__main__':
    # Standard practice to run on 5000 or specific port per microservice
    app.run(host='0.0.0.0', port=5003, debug=True)