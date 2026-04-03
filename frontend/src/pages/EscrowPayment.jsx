import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  CreditCard,
  Shield,
  CheckCircle,
  Lock,
  AlertCircle,
  ArrowLeft,
  Calendar,
  User,
  Briefcase
} from 'lucide-react';

const EscrowPayment = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock data - would come from API
  const applicationData = {
    gigTitle: 'Mobile App UI/UX Design',
    gigId: 1,
    freelancer: {
      name: 'Maya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
      rating: 4.9,
      completedGigs: 87
    },
    amount: 2800,
    contractId: 'contract-123',
    milestones: [
      { phase: 1, title: 'Research & Wireframes', amount: 800, deadline: '7 days' },
      { phase: 2, title: 'High-Fidelity Design', amount: 1200, deadline: '14 days' },
      { phase: 3, title: 'Final Revisions', amount: 800, deadline: '21 days' }
    ]
  };

  // Mock card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace(/\//g, '').length <= 4) {
      setExpiry(formatted);
    }
  };

  const handleCvcChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/gi, '');
    if (v.length <= 4) {
      setCvc(v);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid card number');
      setLoading(false);
      return;
    }
    if (!expiry || expiry.length !== 5) {
      setError('Please enter a valid expiry date');
      setLoading(false);
      return;
    }
    if (!cvc || cvc.length < 3) {
      setError('Please enter a valid CVC');
      setLoading(false);
      return;
    }
    if (!cardName.trim()) {
      setError('Please enter the cardholder name');
      setLoading(false);
      return;
    }

    // MOCK PAYMENT FLOW
    // In production, this would:
    // 1. Call your backend: POST /api/payments/create-intent
    // 2. Use Stripe.js to confirm payment
    // 3. Handle success/failure
    
    setTimeout(() => {
      // Simulate successful payment
      setPaymentSuccess(true);
      setLoading(false);
      
      // After 2 seconds, redirect to contract signing
      setTimeout(() => {
        navigate(`/contract/${applicationData.contractId}`);
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center p-4">
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            SGD {applicationData.amount.toLocaleString()} has been securely held in escrow.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to contract signing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Pay to Escrow</h1>
          <p className="text-gray-400">Payment will be held securely and released when all phases are completed</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Amount Card */}
              <div className="bg-linear-to-br from-gold-300/10 to-gold-300/5 border border-gold-300/30 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <h2 className="text-4xl font-bold text-gray-100">
                      SGD {applicationData.amount.toLocaleString()}
                    </h2>
                  </div>
                  <div className="w-16 h-16 bg-gold-300/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-gold-300" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gold-300/20">
                  <p className="text-xs text-gray-500">
                    🔒 Full amount held in escrow until all phases are completed
                  </p>
                </div>
              </div>

              {/* Card Details */}
              <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-gold-300" />
                  <h3 className="text-lg font-semibold text-gray-100">Card Details</h3>
                </div>

                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-3 bg-dark-200 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 pr-12 ${
                          error && !cardNumber ? 'border-red-400/50' : 'border-dark-50 focus:ring-gold-300/50'
                        }`}
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                    {error && !cardNumber && (
                      <p className="mt-2 text-sm text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 bg-dark-200 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                          error && !expiry ? 'border-red-400/50' : 'border-dark-50 focus:ring-gold-300/50'
                        }`}
                      />
                      {error && !expiry && (
                        <p className="mt-2 text-sm text-red-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={handleCvcChange}
                        placeholder="123"
                        className={`w-full px-4 py-3 bg-dark-200 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                          error && !cvc ? 'border-red-400/50' : 'border-dark-50 focus:ring-gold-300/50'
                        }`}
                      />
                      {error && !cvc && (
                        <p className="mt-2 text-sm text-red-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 bg-dark-200 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                        error && !cardName ? 'border-red-400/50' : 'border-dark-50 focus:ring-gold-300/50'
                      }`}
                    />
                    {error && !cardName && (
                      <p className="mt-2 text-sm text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-dark-200 rounded-lg border border-dark-50">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300 font-medium mb-1">
                        Secured by Stripe
                      </p>
                      <p className="text-xs text-gray-500">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-300 text-dark-200 rounded-lg font-semibold text-lg hover:bg-gold-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-200 border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Pay SGD {applicationData.amount.toLocaleString()} to Escrow
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By clicking "Pay", you agree to FreelanceHub's Terms of Service and Privacy Policy
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Gig Summary */}
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {/* Gig */}
                <div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gold-300 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">{applicationData.gigTitle}</p>
                      <p className="text-xs text-gray-500">Gig #{applicationData.gigId}</p>
                    </div>
                  </div>
                </div>

                {/* Freelancer */}
                <div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gold-300 shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">{applicationData.freelancer.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">⭐ {applicationData.freelancer.rating}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-500">{applicationData.freelancer.completedGigs} gigs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dark-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Subtotal</span>
                  <span className="text-sm text-gray-300">SGD {applicationData.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Platform Fee</span>
                  <span className="text-sm text-green-300">FREE</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-dark-50">
                  <span className="font-semibold text-gray-100">Total</span>
                  <span className="text-xl font-bold text-gold-300">
                    SGD {applicationData.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gold-300" />
                <h3 className="text-lg font-semibold text-gray-100">Payment Milestones</h3>
              </div>
              
              <div className="space-y-3">
                {applicationData.milestones.map((milestone, index) => (
                  <div key={index} className="p-3 bg-dark-200 rounded-lg border border-dark-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">
                        Phase {milestone.phase}: {milestone.title}
                      </span>
                      <span className="text-sm font-semibold text-gold-300">
                        SGD {milestone.amount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Deadline: {milestone.deadline}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-400/10 border border-blue-400/30 rounded-lg">
                <p className="text-xs text-blue-300">
                  ℹ️ Full amount held in escrow until all phases are completed and approved
                </p>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
              <h3 className="text-sm font-semibold text-gray-100 mb-4">Your Protection</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">Full payment secured in escrow</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">Released when final phase is approved</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">Auto-approval after 5 days per phase</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">Refund protection for both parties</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">PCI-DSS compliant payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dev Note */}
        <div className="mt-8 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
          <p className="text-sm text-yellow-300">
            ⚠️ <strong>Development Mode:</strong> This is a mock payment interface. 
            When you integrate Stripe, replace the card inputs with Stripe Elements 
            and connect to your backend API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EscrowPayment;