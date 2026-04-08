import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Clock, Bookmark, Share2, Flag,
    DollarSign, Calendar, Users, Star,
    ArrowLeft, CheckCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import { useJobs } from '../hooks/useJobs';
import { useJoinWaitlist } from '../hooks/useJoinWaitlist';
import { useAuthStore } from '../store/useAuthStore';

const SAVED_GIGS_KEY = 'freelancehub_saved_gigs';
const APPLIED_KEY = (userId) => `freelancehub_applied_${userId}`;

const getAppliedGigs = (userId) => {
    try {
        const saved = localStorage.getItem(APPLIED_KEY(userId));
        return saved ? JSON.parse(saved) : [];
    } catch { return []; }
};

const markAsApplied = (userId, eventId) => {
    const applied = getAppliedGigs(userId);
    if (!applied.includes(eventId)) {
        applied.push(eventId);
        localStorage.setItem(APPLIED_KEY(userId), JSON.stringify(applied));
    }
};

const getSavedGigs = () => {
    try {
        const saved = localStorage.getItem(SAVED_GIGS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const isGigSaved = (gigId) => getSavedGigs().includes(gigId);

const toggleSaveGig = (gigId) => {
    const savedGigs = getSavedGigs();
    const isSaved = savedGigs.includes(gigId);
    if (isSaved) {
        localStorage.setItem(SAVED_GIGS_KEY, JSON.stringify(savedGigs.filter(id => id !== gigId)));
    } else {
        savedGigs.push(gigId);
        localStorage.setItem(SAVED_GIGS_KEY, JSON.stringify(savedGigs));
    }
    window.dispatchEvent(new CustomEvent('savedGigsChanged', {
        detail: { gigId, action: isSaved ? 'unsaved' : 'saved' }
    }));
    return !isSaved;
};

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [isSaved, setIsSaved] = useState(() => isGigSaved(parseInt(id)));
    const [showFlagModal, setShowFlagModal] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const [hasApplied, setHasApplied] = useState(() =>
        user ? getAppliedGigs(user.id).includes(parseInt(id)) : false
    );

    const { data: allJobs, isLoading, isError } = useJobs();
    const { mutate: joinWaitlist, isPending: isJoining } = useJoinWaitlist();

    useEffect(() => {
        const handleSavedGigsChanged = (event) => {
            if (event.detail.gigId === parseInt(id)) {
                setIsSaved(event.detail.action === 'saved');
            }
        };
        window.addEventListener('savedGigsChanged', handleSavedGigsChanged);
        return () => window.removeEventListener('savedGigsChanged', handleSavedGigsChanged);
    }, [id]);

    const job = allJobs?.find(j => String(j.EventID) === String(id));

    const handleJoinWaitlist = () => {
        if (!user) {
            navigate('/auth');
            return;
        }
        joinWaitlist(
            { EventID: parseInt(id), FreelancerID: user.id },
            {
                onSuccess: () => {
                    markAsApplied(user.id, parseInt(id));
                    setHasApplied(true);
                    alert('Successfully joined the waitlist! You will be notified if accepted.');
                },
                onError: (err) => alert(`Failed to join waitlist: ${err.response?.data?.error || err.message}`),
            }
        );
    };

    const handleSave = () => {
        const newState = toggleSaveGig(parseInt(id));
        setIsSaved(newState);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: job?.EventType || 'Gig', url });
            } catch (err) {
                if (err.name !== 'AbortError') console.error('Share failed:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setShowShareTooltip(true);
                setTimeout(() => setShowShareTooltip(false), 2000);
            } catch {
                alert('Could not copy link. Please copy manually: ' + url);
            }
        }
    };

    const handleSubmitFlag = (reason) => {
        console.log('Flagged gig with reason:', reason);
        setShowFlagModal(false);
        alert('Thank you for your report. We will review this gig.');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-300 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading gig details...</p>
                </div>
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Gig Not Found</h2>
                    <p className="text-gray-400 mb-4">This gig may have been closed or does not exist.</p>
                    <button onClick={() => navigate(-1)} className="text-gold-300 hover:text-gold-200">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isOwnGig = user && String(job.ClientID) === String(user.id);
    const daysUntilDue = job.EventDueDate
        ? Math.max(0, Math.ceil((new Date(job.EventDueDate) - new Date()) / (1000 * 60 * 60 * 24)))
        : null;

    return (
        <div className="min-h-screen bg-dark-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Gigs</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-dark-50 text-gray-300 text-xs font-medium rounded-full mb-3">
                                        {job.EventType}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-100 mb-2">
                                        {job.EventType}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>Singapore</span>
                                        </div>
                                        {job.EventStartDate && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>Posted {job.EventStartDate}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                job.EventStatus === 'Open'
                                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                            }`}>
                                                {job.EventStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="p-2 text-gray-400 hover:text-gold-300 transition-colors relative group"
                                        title={isSaved ? 'Remove from saved' : 'Save gig'}
                                    >
                                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-gold-300 text-gold-300' : ''}`} />
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-50 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {isSaved ? 'Saved' : 'Save gig'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="p-2 text-gray-400 hover:text-gold-300 transition-colors relative group"
                                        title="Share this gig"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        {showShareTooltip && (
                                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap">
                                                Link copied!
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowFlagModal(true)}
                                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                        title="Report this gig"
                                    >
                                        <Flag className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-6 w-6 text-gold-300" />
                                <span className="text-3xl font-bold text-gold-300">
                                    SGD {Number(job.EventWage).toLocaleString()}
                                </span>
                                <span className="text-gray-400">Fixed Price</span>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-50">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Start Date</p>
                                    <p className="text-gray-100 font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gold-300" />
                                        {job.EventStartDate || 'TBD'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Due Date</p>
                                    <p className="text-gray-100 font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gold-300" />
                                        {job.EventDueDate || 'TBD'}
                                        {daysUntilDue !== null && (
                                            <span className="text-yellow-400 text-sm font-normal">
                                                ({daysUntilDue}d left)
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* About This Gig */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gold-300 mb-4">About This Gig</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Looking for a skilled <strong className="text-gray-100">{job.EventType}</strong> professional
                                to work on this project. Budget is SGD {Number(job.EventWage).toLocaleString()} with a
                                deadline of {job.EventDueDate || 'TBD'}.
                            </p>
                            <p className="text-gray-400 text-sm mt-3">
                                Join the waitlist to express your interest. The client will review all applicants and
                                accept the best match. Payment is processed via Stripe upon acceptance.
                            </p>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gold-300 mb-4">Payment Details</h2>
                            <div className="p-5 bg-gold-300 rounded-lg">
                                <p className="text-dark-200 text-sm font-medium mb-1">Total Payment</p>
                                <p className="text-3xl font-bold text-dark-200">
                                    SGD {Number(job.EventWage).toLocaleString()}
                                </p>
                                <p className="text-dark-200 text-sm font-medium mt-2">
                                    Processed via Stripe upon acceptance
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Action Card */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            {isOwnGig ? (
                                <>
                                    <p className="text-gray-400 text-sm text-center mb-4">This is your posted gig</p>
                                    <Button
                                        onClick={() => navigate(`/applications/${job.EventID}`)}
                                        className="w-full"
                                    >
                                        <Users className="h-4 w-4 mr-2" />
                                        Review Waitlist
                                    </Button>
                                </>
                            ) : job.EventStatus !== 'Open' ? (
                                <p className="text-gray-400 text-center py-2">
                                    This gig is no longer accepting applications.
                                </p>
                            ) : hasApplied ? (
                                <div className="text-center py-2">
                                    <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="font-semibold">You're on the waitlist</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        The client will review your application and notify you if accepted.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleJoinWaitlist}
                                        disabled={isJoining}
                                        className="w-full mb-4"
                                    >
                                        {isJoining ? 'Joining...' : 'Join Waitlist'}
                                    </Button>
                                    <p className="text-gray-400 text-sm text-center mb-4">
                                        Payment processed via Stripe upon acceptance
                                    </p>
                                    <div className="space-y-3 pt-4 border-t border-dark-50">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Stripe payment verified</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Instant payment on acceptance</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Notification sent when selected</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Client Info */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gold-300 mb-4">About the Client</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-lg">
                                    C
                                </div>
                                <div>
                                    <h4 className="text-gray-100 font-semibold">Client #{job.ClientID}</h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <Star className="h-3 w-3 text-gold-300 fill-gold-300" />
                                        <span>Verified client</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flag/Report Modal */}
            {showFlagModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <Flag className="h-6 w-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-gray-100">Report This Gig</h2>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Select a reason for reporting this gig. Our team will review it.
                        </p>
                        <div className="space-y-2 mb-6">
                            {['Spam or misleading', 'Inappropriate content', 'Scam or fraud', 'Duplicate posting', 'Other violation'].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => handleSubmitFlag(reason)}
                                    className="w-full text-left px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-300 hover:border-red-400 transition-colors"
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                        <Button onClick={() => setShowFlagModal(false)} variant="secondary" className="w-full">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GigDetails;
