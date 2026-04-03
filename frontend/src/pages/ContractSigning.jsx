import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  AlertCircle,
  PenTool,
  Loader
} from 'lucide-react';
import { getContractSigningById } from '../constants/mockData';

const ContractSigning = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);
  const [signatureInput, setSignatureInput] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);

  const contract = getContractSigningById(parseInt(contractId));

  // Mock: In real app, determine from auth
  const currentUserRole = 'freelancer'; // or 'client'
  const currentUserId = 'user-103'; // or 'client-1'

  if (!contract) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Contract Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gold-300 hover:text-gold-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const hasClientSigned = contract.signatures.client.signed;
  const hasFreelancerSigned = contract.signatures.freelancer.signed;
  const isFullySigned = hasClientSigned && hasFreelancerSigned;

  const currentUserHasSigned = currentUserRole === 'client' 
    ? hasClientSigned 
    : hasFreelancerSigned;

  const otherPartyName = currentUserRole === 'client'
    ? contract.freelancer.name
    : contract.client.name;

  const handleSign = () => {
    setShowSignModal(true);
  };

  const confirmSign = async () => {
    if (!signatureInput.trim()) {
      alert('Please enter your full name to sign');
      return;
    }

    setIsSigning(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSigning(false);
      setShowSignModal(false);
      
      // In real app, this would update via API
      if (currentUserRole === 'client') {
        contract.signatures.client.signed = true;
        contract.signatures.client.signedAt = new Date().toISOString();
        contract.signatures.client.signature = signatureInput;
      } else {
        contract.signatures.freelancer.signed = true;
        contract.signatures.freelancer.signedAt = new Date().toISOString();
        contract.signatures.freelancer.signature = signatureInput;
      }

      // Check if both signed
      if (contract.signatures.client.signed && contract.signatures.freelancer.signed) {
        contract.status = 'fully_signed';
        // Navigate to active contract
        setTimeout(() => {
          navigate(`/contracts/${contract.id}`);
        }, 2000);
      } else {
        contract.status = currentUserRole === 'client' 
          ? 'awaiting_freelancer_signature'
          : 'awaiting_client_signature';
      }

      window.location.reload(); // Reload to show updated state
    }, 1500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Status Banner */}
          <div className={`rounded-lg border p-4 mb-6 ${
            isFullySigned 
              ? 'bg-green-400/10 border-green-400/30'
              : currentUserHasSigned
              ? 'bg-blue-400/10 border-blue-400/30'
              : 'bg-yellow-400/10 border-yellow-400/30'
          }`}>
            <div className="flex items-center gap-3">
              {isFullySigned ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <div>
                    <div className="font-semibold text-green-300">Contract Fully Signed</div>
                    <div className="text-sm text-gray-400">Both parties have signed. Redirecting to active contract...</div>
                  </div>
                </>
              ) : currentUserHasSigned ? (
                <>
                  <Clock className="w-6 h-6 text-blue-300" />
                  <div>
                    <div className="font-semibold text-blue-300">Awaiting {otherPartyName}'s Signature</div>
                    <div className="text-sm text-gray-400">You've signed. Waiting for the other party to sign.</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-yellow-300" />
                  <div>
                    <div className="font-semibold text-yellow-300">Action Required: Sign Contract</div>
                    <div className="text-sm text-gray-400">Please review and sign this contract to proceed.</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contract Document */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 overflow-hidden">
          {/* Contract Header */}
          <div className="bg-dark-200 border-b border-dark-50 p-8">
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 text-gold-300" />
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-100 mb-2">
              Freelance Service Contract
            </h1>
            <p className="text-center text-gray-400">
              Contract ID: #{contract.id.toString().padStart(6, '0')}
            </p>
            <p className="text-center text-sm text-gray-500">
              Created {formatDate(contract.createdAt)}
            </p>
          </div>

          {/* Contract Body */}
          <div className="p-8 space-y-8">
            {/* Project Title */}
            <div>
              <h2 className="text-2xl font-bold text-gold-300 mb-2">
                {contract.gigTitle}
              </h2>
              <p className="text-gray-400">{contract.projectDetails.description}</p>
            </div>

            {/* Parties */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gold-300" />
                Contract Parties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client */}
                <div className="bg-dark-200 rounded-lg p-4 border border-dark-50">
                  <div className="text-sm text-gray-400 mb-2">CLIENT</div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={contract.client.avatar}
                      alt={contract.client.name}
                      className="w-12 h-12 rounded-full bg-dark-50"
                    />
                    <div>
                      <div className="font-semibold text-gray-100">{contract.client.name}</div>
                      <div className="text-sm text-gray-400">{contract.client.email}</div>
                    </div>
                  </div>
                  {currentUserId === contract.client.id && (
                    <span className="inline-block px-2 py-1 bg-gold-300/20 text-gold-300 rounded text-xs">You</span>
                  )}
                </div>

                {/* Freelancer */}
                <div className="bg-dark-200 rounded-lg p-4 border border-dark-50">
                  <div className="text-sm text-gray-400 mb-2">FREELANCER</div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={contract.freelancer.avatar}
                      alt={contract.freelancer.name}
                      className="w-12 h-12 rounded-full bg-dark-50"
                    />
                    <div>
                      <div className="font-semibold text-gray-100">{contract.freelancer.name}</div>
                      <div className="text-sm text-gray-400">{contract.freelancer.email}</div>
                    </div>
                  </div>
                  {currentUserId === contract.freelancer.id && (
                    <span className="inline-block px-2 py-1 bg-gold-300/20 text-gold-300 rounded text-xs">You</span>
                  )}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-300" />
                Project Details
              </h3>
              <div className="bg-dark-200 rounded-lg p-4 border border-dark-50 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Location</div>
                    <div className="text-gray-200">{contract.projectDetails.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Start Date</div>
                    <div className="text-gray-200">{formatDate(contract.projectDetails.startDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Expected Duration</div>
                    <div className="text-gray-200">{contract.projectDetails.expectedDuration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Total Budget</div>
                    <div className="text-gold-300 font-semibold text-lg">
                      {contract.financials.currency} {contract.financials.totalBudget.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gold-300" />
                Project Milestones
              </h3>
              <div className="bg-dark-200 rounded-lg border border-dark-50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Milestone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Deliverables</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contract.milestones.map((milestone) => (
                        <tr key={milestone.id} className="border-b border-dark-50 last:border-b-0">
                          <td className="px-4 py-4">
                            <div className="w-8 h-8 rounded-full bg-gold-300 text-dark-200 flex items-center justify-center font-bold text-sm">
                              {milestone.number}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-100 mb-1">{milestone.title}</div>
                            <div className="text-sm text-gray-400">{milestone.description}</div>
                          </td>
                          <td className="px-4 py-4">
                            <ul className="space-y-1">
                              {milestone.deliverables.map((item, i) => (
                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                  <span className="text-gold-300">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-300">{milestone.deadline}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3 p-4 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-blue-300">Payment Structure:</span> {contract.financials.paymentStructure}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-300" />
                Terms and Conditions
              </h3>
              <div className="space-y-4">
                {contract.terms.map((term, index) => (
                  <div key={index} className="bg-dark-200 rounded-lg p-4 border border-dark-50">
                    <h4 className="font-semibold text-gray-100 mb-2">{term.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{term.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Fees */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gold-300" />
                Platform Fees
              </h3>
              <div className="bg-dark-200 rounded-lg p-4 border border-dark-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Client Processing Fee</div>
                    <div className="text-gray-200">{contract.platformFees.clientFee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Freelancer Service Fee</div>
                    <div className="text-gray-200">{contract.platformFees.freelancerFee}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 italic">{contract.platformFees.note}</div>
              </div>
            </div>

            {/* Signatures Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-gold-300" />
                Digital Signatures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Signature */}
                <div className={`rounded-lg p-6 border-2 ${
                  hasClientSigned 
                    ? 'bg-green-400/10 border-green-400/30' 
                    : 'bg-dark-200 border-dark-50'
                }`}>
                  <div className="text-sm text-gray-400 mb-3">CLIENT SIGNATURE</div>
                  {hasClientSigned ? (
                    <>
                      <div className="mb-4">
                        <div className="text-2xl font-signature text-gray-100 mb-2 font-cursive italic">
                          {contract.signatures.client.signature}
                        </div>
                        <div className="h-px bg-gray-600 mb-2"></div>
                        <div className="text-xs text-gray-500">
                          Signed {formatDateTime(contract.signatures.client.signedAt)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Signed</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Awaiting signature</div>
                    </div>
                  )}
                </div>

                {/* Freelancer Signature */}
                <div className={`rounded-lg p-6 border-2 ${
                  hasFreelancerSigned 
                    ? 'bg-green-400/10 border-green-400/30' 
                    : 'bg-dark-200 border-dark-50'
                }`}>
                  <div className="text-sm text-gray-400 mb-3">FREELANCER SIGNATURE</div>
                  {hasFreelancerSigned ? (
                    <>
                      <div className="mb-4">
                        <div className="text-2xl font-signature text-gray-100 mb-2 font-cursive italic">
                          {contract.signatures.freelancer.signature}
                        </div>
                        <div className="h-px bg-gray-600 mb-2"></div>
                        <div className="text-xs text-gray-500">
                          Signed {formatDateTime(contract.signatures.freelancer.signedAt)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Signed</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Awaiting signature</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          {!isFullySigned && (
            <div className="bg-dark-200 border-t border-dark-50 p-6">
              {currentUserHasSigned ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-400/20 text-blue-300 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">You've signed this contract</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    Waiting for {otherPartyName} to sign. They will be notified.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleSign}
                    className="px-8 py-4 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
                  >
                    <PenTool className="w-5 h-5" />
                    Sign Contract
                  </button>
                  <p className="text-sm text-gray-400 mt-3">
                    By signing, you agree to all terms and conditions outlined above
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sign Modal */}
        {showSignModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-100 rounded-lg border border-dark-50 max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-4">Sign Contract</h3>
              <p className="text-sm text-gray-400 mb-6">
                Please type your full legal name to sign this contract digitally.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Your Full Name</label>
                <input
                  type="text"
                  value={signatureInput}
                  onChange={(e) => setSignatureInput(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
                  disabled={isSigning}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignModal(false)}
                  disabled={isSigning}
                  className="flex-1 px-4 py-3 border border-dark-50 text-gray-300 rounded-lg hover:bg-dark-200 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSign}
                  disabled={isSigning || !signatureInput.trim()}
                  className="flex-1 px-4 py-3 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSigning ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Signing...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-5 h-5" />
                      Confirm Signature
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractSigning;