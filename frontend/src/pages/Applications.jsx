import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Clock
} from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { useWaitlistEntries } from '../hooks/useWaitlistEntries';
import { useAcceptFreelancer } from '../hooks/useAcceptFreelancer';

const Applications = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const { mutate: acceptMutate, isPending: isAccepting } = useAcceptFreelancer();

  // Fetch real job data
  const { data: allJobs, isLoading: jobsLoading } = useJobs();
  const job = allJobs?.find(j => String(j.EventID) === String(gigId));

  // Fetch real waitlist entries for this event
  const { data: waitlistEntries, isLoading: waitlistLoading, isError: waitlistError } = useWaitlistEntries(gigId);

  const isLoading = jobsLoading || waitlistLoading;

  const filteredEntries = (waitlistEntries || []).filter(entry => {
    if (filterStatus === 'all') return true;
    return entry.WaitlistStatus === filterStatus;
  });

  const handleAccept = (entry) => {
    if (!window.confirm(`Accept Freelancer #${entry.FreelancerID} for this gig? Payment will be processed immediately via Stripe.`)) return;

    acceptMutate(
      {
        UserID: entry.FreelancerID,
        EventID: parseInt(gigId),
        WaitlistID: entry.WaitlistID,
      },
      {
        onSuccess: () => {
          alert(`Freelancer #${entry.FreelancerID} has been accepted! Payment processed via Stripe.`);
          navigate('/dashboard');
        },
        onError: (err) => {
          alert(`Failed to accept freelancer: ${err.response?.data?.error || err.message}`);
        },
      }
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
      Accepted: 'bg-green-500/20 text-green-300 border border-green-500/30',
      Rejected: 'bg-red-500/20 text-red-300 border border-red-500/30',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-300 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Gig Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="text-gold-300 hover:text-gold-200">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

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

          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">{job.EventType}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gold-300" />
                    <span className="text-gold-300 font-medium">SGD {Number(job.EventWage).toLocaleString()}</span>
                  </div>
                  {job.EventDueDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold-300" />
                      <span>Due {job.EventDueDate}</span>
                    </div>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    job.EventStatus === 'Open'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {job.EventStatus}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-300">{(waitlistEntries || []).length}</div>
                  <div className="text-sm text-gray-400">Applicants</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Filter by status:</span>
            {['all', 'Pending', 'Accepted', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-gold-300 text-dark-200'
                    : 'bg-dark-200 text-gray-400 hover:text-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-dark-50">
            <p className="text-sm text-gray-400">
              Showing <span className="text-gray-200 font-medium">{filteredEntries.length}</span> of{' '}
              <span className="text-gray-200 font-medium">{(waitlistEntries || []).length}</span> applicants
            </p>
          </div>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {waitlistError ? (
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-12 text-center">
              <p className="text-gray-400">Could not load applicants. Make sure the backend is running.</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-12 text-center">
              <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No applicants yet</p>
              <p className="text-gray-500 text-sm mt-1">
                {filterStatus !== 'all' ? 'Try changing the filter.' : 'Share your gig to attract freelancers.'}
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.WaitlistID}
                className="bg-dark-100 rounded-lg border border-dark-50 p-6 hover:border-gold-300/30 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Freelancer Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full bg-gold-300/20 border border-gold-300/30 flex items-center justify-center text-gold-300 font-bold text-lg shrink-0">
                      #{entry.FreelancerID}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100">
                        Freelancer #{entry.FreelancerID}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {getStatusBadge(entry.WaitlistStatus)}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Waitlist ID: {entry.WaitlistID}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {entry.WaitlistStatus === 'Pending' && (
                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={() => handleAccept(entry)}
                        disabled={isAccepting}
                        className="px-5 py-2.5 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all flex items-center gap-2 font-semibold disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {isAccepting ? 'Processing...' : 'Accept & Pay'}
                      </button>
                    </div>
                  )}

                  {entry.WaitlistStatus === 'Accepted' && (
                    <div className="flex items-center gap-2 text-green-400 shrink-0">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Accepted</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
