import stripe
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv  

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = Flask(__name__)

# --- SCENARIO 1: Check Balance / Authorize Funds ---
@app.route('/payments/authorize-job', methods=['POST'])
def authorize_job_payment():
    data = request.json
    user_id = data.get('UserID')
    event_wage = data.get('EventWage') 
    
    try:
        # Stripe expects amounts in cents (e.g., $50.00 = 5000)
        amount_cents = int(event_wage * 100)

        intent = stripe.PaymentIntent.create(
            amount=amount_cents,
            currency='usd',
            payment_method_types=['card'],
            capture_method='manual',  # This puts the funds in "Escrow" (Auth only)
            metadata={
                'client_id': user_id,
                'type': 'job_escrow'
            }
        )

        return jsonify({
            "status": "sufficient",
            "payment_intent_id": intent.id,
            "client_secret": intent.client_secret
        }), 200

    except stripe.error.CardError as e:
        return jsonify({"status": "insufficient", "error": str(e)}), 402
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# --- SCENARIO 3: Create Escrow & Payout ---
@app.route('/payments/finalize-gig', methods=['POST'])
def finalize_gig():
    data = request.json
    payment_intent_id = data.get('PaymentIntentID')
    freelancer_stripe_id = data.get('FreelancerStripeID')
    # platform_fee = data.get('PlatformFee', 0)

    try:
        # 1. Capture the payment (Move money from 'Hold' to 'Your Account')
        intent = stripe.PaymentIntent.capture(payment_intent_id)
        
        # 2. Calculate Payout (Amount - Fee)
        payout_amount = intent.amount 
        # - int(platform_fee * 100)

        # 3. Transfer to Freelancer (Scenario 3 - Escrow Payment)
        transfer = stripe.Transfer.create(
            amount=payout_amount,
            currency="usd",
            destination=freelancer_stripe_id,
            transfer_group=intent.metadata.get('job_id')
        )

        return jsonify({
            "status": "success",
            "transfer_id": transfer.id,
            "amount_transferred": payout_amount / 100
        }), 200

    except Exception as e:
        return jsonify({"status": "failed", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5003)