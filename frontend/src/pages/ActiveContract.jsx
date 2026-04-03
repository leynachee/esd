import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Circle,
  AlertCircle,
  FileText,
  Download,
  MessageSquare,
  TrendingUp,
  User,
  Shield,
  Upload,
  Eye,
  Timer,
  Activity
} from 'lucide-react';
import { getContractById } from '../constants/mockData';

const ActiveContract = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // overview, timeline

  const contract = getContractById(parseInt(contractId));

  // Mock: In real app, determine from auth
  const currentUserRole = 'freelancer'; // or 'client'
  const currentUserId = contract?.freelancer.id; // or client.id

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

  const completedPhases = contract.phases.filter(p => p.status === 'completed').length;
  const totalPhases = contract.phases.length;
  const progressPercentage = (completedPhases / totalPhases) * 100;

  const getPhaseStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-300';
      case 'under_review': return 'text-blue-300';
      case 'in_progress': return 'text-yellow-300';
      case 'revision_requested': return 'text-orange-300';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getPhaseStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20';
      case 'under_review': return 'bg-blue-400/20';
      case 'in_progress': return 'bg-yellow-400/20';
      case 'revision_requested': return 'bg-orange-400/20';
      case 'pending': return 'bg-gray-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  const getPhaseStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'under_review': return <Eye className="w-5 h-5" />;
      case 'in_progress': return <Activity className="w-5 h-5" />;
      case 'revision_requested': return <AlertCircle className="w-5 h-5" />;
      case 'pending': return <Circle className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const getPhaseStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'under_review': return 'Under Review';
      case 'in_progress': return 'In Progress';
      case 'revision_requested': return 'Revision Requested';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Contract Header Card */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Contract Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-100">{contract.gigTitle}</h1>
                  <span className={`px-3 py-1 ${getPhaseStatusBg(contract.status)} ${getPhaseStatusColor(contract.status)} rounded-full text-sm font-medium capitalize`}>
                    {contract.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Client */}
                  <div className="flex items-center gap-3 p-3 bg-dark-200 rounded-lg">
                    <img
                      src={contract.client.avatar}
                      alt={contract.client.name}
                      className="w-12 h-12 rounded-full bg-dark-50"
                    />
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Client</div>
                      <div className="text-gray-100 font-medium">{contract.client.name}</div>
                    </div>
                    {currentUserId === contract.client.id && (
                      <span className="ml-auto px-2 py-1 bg-gold-300/20 text-gold-300 rounded text-xs">You</span>
                    )}
                  </div>

                  {/* Freelancer */}
                  <div className="flex items-center gap-3 p-3 bg-dark-200 rounded-lg">
                    <img
                      src={contract.freelancer.avatar}
                      alt={contract.freelancer.name}
                      className="w-12 h-12 rounded-full bg-dark-50"
                    />
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Freelancer</div>
                      <div className="text-gray-100 font-medium flex items-center gap-2">
                        {contract.freelancer.name}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-400">{contract.freelancer.rating}</span>
                        </div>
                      </div>
                    </div>
                    {currentUserId === contract.freelancer.id && (
                      <span className="ml-auto px-2 py-1 bg-gold-300/20 text-gold-300 rounded text-xs">You</span>
                    )}
                  </div>
                </div>

                {/* Contract Details */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>Started {formatDate(contract.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>Due {formatDate(contract.expectedCompletionDate)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Budget Info */}
              <div className="flex flex-col gap-4 lg:min-w-70">
                <div className="bg-dark-200 rounded-lg p-4 border border-dark-50">
                  <div className="text-sm text-gray-400 mb-2">Total Budget</div>
                  <div className="text-3xl font-bold text-gold-300">
                    SGD {contract.totalBudget.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <Shield className="w-3 h-3" />
                      <span>In Escrow</span>
                    </div>
                    <div className="text-lg font-semibold text-blue-300">
                      SGD {contract.escrowBalance.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Released</span>
                    </div>
                    <div className="text-lg font-semibold text-green-300">
                      SGD {contract.releasedAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-6 border-t border-dark-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Overall Progress</span>
                <span className="text-sm font-medium text-gray-200">
                  {completedPhases} of {totalPhases} phases completed
                </span>
              </div>
              <div className="w-full bg-dark-50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-gold-300 to-yellow-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-dark-50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-2 font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-gold-300'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Phases
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 px-2 font-medium transition-colors relative ${
              activeTab === 'timeline'
                ? 'text-gold-300'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Activity Timeline
            {activeTab === 'timeline' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-300" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {contract.phases.map((phase, index) => (
              <div
                key={phase.id}
                className="bg-dark-100 rounded-lg border border-dark-50 overflow-hidden"
              >
                {/* Phase Header */}
                <div className="p-6 border-b border-dark-50">
                  <div className="flex items-start gap-4">
                    {/* Phase Number */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-gold-300 text-dark-200 flex items-center justify-center font-bold">
                      {phase.number}
                    </div>

                    {/* Phase Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-gray-100">{phase.title}</h3>
                        <div className={`flex items-center gap-2 px-3 py-1.5 ${getPhaseStatusBg(phase.status)} ${getPhaseStatusColor(phase.status)} rounded-lg text-sm font-medium`}>
                          {getPhaseStatusIcon(phase.status)}
                          <span>{getPhaseStatusText(phase.status)}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-3">{phase.description}</p>

                      {/* Phase Dates */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {phase.startDate && (
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Calendar className="w-4 h-4 text-gold-300" />
                            <span>Started {formatDate(phase.startDate)}</span>
                          </div>
                        )}
                        {phase.deadline && (
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Clock className="w-4 h-4 text-gold-300" />
                            <span>Deadline {formatDate(phase.deadline)}</span>
                          </div>
                        )}
                        {phase.completedDate && (
                          <div className="flex items-center gap-1.5 text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completed {formatDate(phase.completedDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="p-6 bg-dark-200/50">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Expected Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {phase.deliverables.map((deliverable, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submitted Work (if any) */}
                {phase.submittedWork && (
                  <div className="p-6 border-t border-dark-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Submitted Work
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(phase.submittedWork.submittedAt)}
                      </span>
                    </div>

                    {/* Files */}
                    <div className="space-y-2 mb-4">
                      {phase.submittedWork.files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-dark-200 rounded-lg hover:bg-dark-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gold-300" />
                            <span className="text-sm text-gray-300">{file.name}</span>
                          </div>
                          <button className="text-gold-300 hover:text-gold-200 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Notes */}
                    {phase.submittedWork.notes && (
                      <div className="p-4 bg-dark-200 rounded-lg">
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {phase.submittedWork.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Auto-Approval Timer (if under review) */}
                {phase.status === 'under_review' && phase.autoApprovalDate && (
                  <div className="p-6 bg-yellow-400/10 border-t border-yellow-400/20">
                    <div className="flex items-start gap-3">
                      <Timer className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-yellow-300 mb-1">
                          Auto-Approval Timer
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Work will be automatically approved if not reviewed within 5 days of submission.
                        </p>
                        <div className="text-lg font-semibold text-yellow-300">
                          {phase.timeUntilAutoApproval} remaining
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Review (if reviewed) */}
                {phase.review && (
                  <div className="p-6 bg-green-400/10 border-t border-green-400/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-green-300">
                            {phase.review.status === 'approved' ? 'Approved' : 'Revision Requested'}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDateTime(phase.review.reviewedAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{phase.review.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="p-6 border-t border-dark-50 bg-dark-200/30">
                  {/* Freelancer: Submit work for in-progress phase */}
                  {currentUserRole === 'freelancer' && phase.status === 'in_progress' && (
                    <button
                      onClick={() => navigate(`/submit/${contract.id}/${phase.id}`)}
                      className="w-full px-6 py-3 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Submit Deliverables
                    </button>
                  )}

                  {/* Client: Review work for under_review phase */}
                  {currentUserRole === 'client' && phase.status === 'under_review' && (
                    <button
                      onClick={() => navigate(`/review/${contract.id}/${phase.id}`)}
                      className="w-full px-6 py-3 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Review Deliverables
                    </button>
                  )}

                  {/* Both: View details for completed phase */}
                  {phase.status === 'completed' && (
                    <button
                      onClick={() => alert('View phase details')}
                      className="w-full px-6 py-3 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 hover:bg-dark-200 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      View Details
                    </button>
                  )}

                  {/* Pending phases - no action */}
                  {phase.status === 'pending' && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      Phase will start after previous phase is completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gold-300" />
              Activity Timeline
            </h3>
            <div className="space-y-4">
              {contract.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-gold-300 mt-2" />
                    {index < contract.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-dark-50 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-sm text-gray-400 mb-1">
                      {formatDateTime(event.date)}
                    </div>
                    <div className="text-gray-200">
                      <span className="font-medium text-gold-300">{event.actor}</span>
                      <span className="text-gray-400"> {event.action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/messages')}
            className="flex items-center gap-2 px-6 py-3 bg-dark-100 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 hover:bg-dark-200 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Message {currentUserRole === 'client' ? contract.freelancer.name : contract.client.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveContract;