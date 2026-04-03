import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  MessageSquare,
  Timer,
  AlertCircle,
  Send,
  Eye,
  DollarSign,
  Loader
} from 'lucide-react';
import { getContractById } from '../constants/mockData';

const ReviewDeliverables = () => {
  const { contractId, phaseId } = useParams();
  const navigate = useNavigate();
  
  const [decision, setDecision] = useState(null); // 'approve' or 'revise'
  const [feedback, setFeedback] = useState('');
  const [revisionNotes, setRevisionNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showReviseModal, setShowReviseModal] = useState(false);

  const contract = getContractById(parseInt(contractId));
  const phase = contract?.phases.find(p => p.id === phaseId);

  // Mock: In real app, determine from auth
  const currentUserRole = 'client';

  if (!contract || !phase) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Phase Not Found</h2>
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

  // Check if user is authorized (client only)
  if (currentUserRole !== 'client') {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">Only the client can review deliverables.</p>
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="text-gold-300 hover:text-gold-200"
          >
            Back to Contract
          </button>
        </div>
      </div>
    );
  }

  // Check if phase is in correct status
  if (phase.status !== 'under_review') {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Cannot Review</h2>
          <p className="text-gray-400 mb-4">
            This phase is currently: <span className="text-yellow-300 font-medium capitalize">{phase.status.replace('_', ' ')}</span>
          </p>
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="text-gold-300 hover:text-gold-200"
          >
            Back to Contract
          </button>
        </div>
      </div>
    );
  }

  const isFinalPhase = phase.number === contract.phases.length;

  const handleApprove = () => {
    setDecision('approve');
    setShowApproveModal(true);
  };

  const handleRequestRevision = () => {
    setDecision('revise');
    setShowReviseModal(true);
  };

  const confirmApprove = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowApproveModal(false);
      
      // In real app, this would update via API
      if (isFinalPhase) {
        alert(`✅ Final Phase Approved!\n\n✓ Phase ${phase.number} approved\n✓ Full payment (SGD ${contract.totalBudget}) released from escrow\n✓ Contract completed successfully\n\nBoth parties will receive confirmation emails.`);
      } else {
        alert(`✅ Phase ${phase.number} Approved!\n\n✓ Work accepted\n✓ Moving to next phase\n\nFreelancer has been notified.`);
      }
      
      navigate(`/contracts/${contractId}`);
    }, 2000);
  };

  const confirmRevision = async () => {
    if (!revisionNotes.trim()) {
      alert('Please provide revision notes');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowReviseModal(false);
      
      alert(`🔄 Revision Requested\n\n✓ Freelancer notified\n✓ 3 days to revise and resubmit\n✓ Your notes: ${revisionNotes.substring(0, 50)}...`);
      
      navigate(`/contracts/${contractId}`);
    }, 2000);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contract</span>
          </button>

          {/* Page Title */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-start gap-4">
              {/* Phase Number */}
              <div className="shrink-0 w-12 h-12 rounded-full bg-gold-300 text-dark-200 flex items-center justify-center font-bold text-xl">
                {phase.number}
              </div>

              {/* Phase Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-100 mb-2">
                  Review Deliverables: {phase.title}
                </h1>
                <p className="text-gray-400 mb-4">{phase.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Eye className="w-4 h-4 text-gold-300" />
                    <span>Freelancer: {contract.freelancer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText className="w-4 h-4 text-gold-300" />
                    <span>Submitted: {formatDateTime(phase.submittedWork?.submittedAt)}</span>
                  </div>
                  {isFinalPhase && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gold-300/20 text-gold-300 rounded-full text-xs font-medium">
                      <DollarSign className="w-3 h-3" />
                      <span>Final Phase - Payment Release</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Approval Timer */}
        {phase.autoApprovalDate && (
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-yellow-300 mb-1">Auto-Approval Timer</div>
                <p className="text-sm text-gray-400 mb-2">
                  Work will be automatically approved if not reviewed by {formatDateTime(phase.autoApprovalDate)}
                </p>
                <div className="text-lg font-semibold text-yellow-300">
                  {phase.timeUntilAutoApproval} remaining
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expected Deliverables */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gold-300" />
            Expected Deliverables
          </h3>
          <ul className="space-y-2">
            {phase.deliverables.map((deliverable, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-300 mt-2 shrink-0"></div>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submitted Files */}
        {phase.submittedWork && (
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-300" />
              Submitted Files
            </h3>
            <div className="space-y-3">
              {phase.submittedWork.files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-dark-200 rounded-lg border border-dark-50 hover:border-gold-300/30 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5 text-gold-300 shrink-0" />
                    <span className="text-gray-200">{file.name}</span>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-gold-300/20 text-gold-300 rounded-lg hover:bg-gold-300/30 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Freelancer Notes */}
        {phase.submittedWork?.notes && (
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold-300" />
              Notes from Freelancer
            </h3>
            <div className="p-4 bg-dark-200 rounded-lg border border-dark-50">
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {phase.submittedWork.notes}
              </p>
            </div>
          </div>
        )}

        {/* Feedback Section (Optional) */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gold-300" />
            Your Feedback (Optional)
          </h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add positive feedback, suggestions, or comments about the work..."
            rows={4}
            className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50 resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            This feedback will be shared with the freelancer and may be used in their review.
          </p>
        </div>

        {/* Important Notice for Final Phase */}
        {isFinalPhase && (
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-400">
                <p className="font-medium text-green-300 mb-1">Final Phase - Payment Release</p>
                <p>
                  This is the final phase of the project. Approving this phase will release the full payment of{' '}
                  <span className="text-green-300 font-medium">SGD {contract.totalBudget.toLocaleString()}</span> from escrow
                  to {contract.freelancer.name}. The contract will be marked as completed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleRequestRevision}
            disabled={isProcessing}
            className="px-6 py-4 bg-orange-400/20 text-orange-300 rounded-lg hover:bg-orange-400/30 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-orange-400/30"
          >
            <XCircle className="w-5 h-5" />
            Request Revisions
          </button>
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className="px-6 py-4 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Approve Work
          </button>
        </div>

        {/* Approve Modal */}
        {showApproveModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-100 rounded-lg border border-dark-50 max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-300" />
                Approve Phase {phase.number}?
              </h3>
              
              {isFinalPhase ? (
                <div className="mb-6 space-y-3">
                  <p className="text-gray-400">
                    You are approving the <span className="text-gold-300 font-medium">final phase</span> of this project.
                  </p>
                  <div className="p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                    <p className="text-sm text-green-300 font-medium mb-2">This will:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>✓ Release SGD {contract.totalBudget.toLocaleString()} from escrow</li>
                      <li>✓ Transfer payment to {contract.freelancer.name}</li>
                      <li>✓ Mark contract as completed</li>
                      <li>✓ Enable both parties to leave reviews</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-gray-400 mb-3">
                    Are you satisfied with the deliverables for this phase?
                  </p>
                  <div className="p-4 bg-blue-400/10 border border-blue-400/30 rounded-lg">
                    <p className="text-sm text-blue-300">
                      Approving will move the project to Phase {phase.number + 1}
                    </p>
                  </div>
                </div>
              )}

              {feedback && (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Your feedback:</p>
                  <div className="p-3 bg-dark-200 rounded-lg border border-dark-50">
                    <p className="text-sm text-gray-300">{feedback}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 border border-dark-50 text-gray-300 rounded-lg hover:bg-dark-200 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 bg-green-400 text-dark-200 rounded-lg hover:bg-green-300 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {isFinalPhase ? 'Approve & Release Payment' : 'Confirm Approval'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Revision Modal */}
        {showReviseModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-100 rounded-lg border border-dark-50 max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-orange-300" />
                Request Revisions
              </h3>
              
              <p className="text-gray-400 mb-4">
                Please provide clear, specific notes on what needs to be revised.
              </p>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Revision Notes *</label>
                <textarea
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Be specific about what needs to be changed or improved..."
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50 resize-none"
                  disabled={isProcessing}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Freelancer has 3 business days to complete revisions and resubmit.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReviseModal(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 border border-dark-50 text-gray-300 rounded-lg hover:bg-dark-200 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRevision}
                  disabled={isProcessing || !revisionNotes.trim()}
                  className="flex-1 px-4 py-3 bg-orange-400 text-dark-200 rounded-lg hover:bg-orange-300 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Revision Request
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

export default ReviewDeliverables;