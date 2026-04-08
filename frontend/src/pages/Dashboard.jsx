import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase, Clock, CheckCircle,
    PlusCircle, DollarSign, Users,
    Eye, Edit, Trash2, MessageSquare
} from 'lucide-react';
import Button from '../components/common/Button';
import { useJobs } from '../hooks/useJobs';
import { useAuthStore } from '../store/useAuthStore';

const APPLIED_KEY = (userId) => `freelancehub_applied_${userId}`;
const getAppliedGigIds = (userId) => {
    try {
        const saved = localStorage.getItem(APPLIED_KEY(userId));
        return saved ? JSON.parse(saved) : [];
    } catch { return []; }
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('posted');

    const user = useAuthStore((state) => state.user);
    const { data: allJobs, isLoading: jobsLoading } = useJobs();

    // Jobs this user posted (ClientID matches)
    const postedGigs = allJobs
        ? allJobs
            .filter((job) => String(job.ClientID) === String(user?.id))
            .map((job) => ({
                id: job.EventID,
                title: job.EventType,
                budget: job.EventWage,
                applicants: 0,
                status: job.EventStatus === 'Open' ? 'reviewing' : 'in_progress',
                postedAt: job.EventStartDate || 'Recently',
                category: job.EventType,
                freelancer: job.FreelancerID ? `Freelancer #${job.FreelancerID}` : null,
            }))
        : [];

    // Jobs this user is working on (FreelancerID matches, In Progress)
    const workingGigs = allJobs
        ? allJobs
            .filter((job) => String(job.FreelancerID) === String(user?.id) && job.EventStatus === 'In Progress')
            .map((job) => ({
                id: job.EventID,
                contractId: job.EventID,
                title: job.EventType,
                budget: job.EventWage,
                client: `Client #${job.ClientID}`,
                status: 'in_progress',
                currentPhase: 'In Progress',
                phaseNumber: 1,
                totalPhases: 1,
                daysLeft: job.EventDueDate
                    ? Math.max(0, Math.ceil((new Date(job.EventDueDate) - new Date()) / (1000 * 60 * 60 * 24)))
                    : '?',
                category: job.EventType,
            }))
        : [];

    // Gigs the user has applied to (stored in localStorage, cross-referenced with job data)
    const appliedGigIds = user ? getAppliedGigIds(user.id) : [];
    const appliedGigs = allJobs
        ? allJobs
            .filter((job) =>
                appliedGigIds.includes(job.EventID) &&
                String(job.ClientID) !== String(user?.id) &&
                !(String(job.FreelancerID) === String(user?.id) && job.EventStatus === 'In Progress')
            )
            .map((job) => ({
                id: job.EventID,
                gigId: job.EventID,
                title: job.EventType,
                budget: job.EventWage,
                client: `Client #${job.ClientID}`,
                status: String(job.FreelancerID) === String(user?.id) ? 'accepted' : 'under_review',
                appliedAt: job.EventStartDate || 'Recently',
                category: job.EventType,
            }))
        : [];

    const stats = {
        gigsPosted: postedGigs.length,
        gigsWorking: workingGigs.length,
        applicationsPending: appliedGigs.length,
        totalEarned: 0,
        totalSpent: 0,
    };

    const getStatusBadge = (status) => {
        const styles = {
            reviewing: 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-400',
            in_progress: 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-400',
            completed: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400',
            under_review: 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-400',
            accepted: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400',
        };

        const labels = {
            reviewing: 'Reviewing Applications',
            in_progress: 'In Progress',
            completed: 'Completed',
            under_review: 'Pending',
            accepted: 'Accepted',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    // Handler functions
    const handleEditGig = (gigId) => {
        // TODO: Navigate to edit page when available
        alert(`Edit functionality will navigate to edit page for gig ${gigId}`);
        // navigate(`/gigs/${gigId}/edit`);
    };

    const handleCloseGig = (gigId, gigTitle) => {
        if (window.confirm(`Are you sure you want to close "${gigTitle}"? This will remove it from active listings.`)) {
            // TODO: Connect to backend API
            alert(`Gig "${gigTitle}" closed. (Will be connected to backend)`);
            // In production: await apiClient.post(`/gigs/${gigId}/close`);
        }
    };

    return (
        <div className="min-h-screen bg-dark-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gold-300 mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user?.name || 'User'}</p>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-100 border border-dark-50 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gold-300 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/post-gig">
                            <Button className="w-full flex items-center justify-center gap-2">
                                <PlusCircle className="h-5 w-5" />
                                Post a Gig
                            </Button>
                        </Link>
                        <Link to="/explore">
                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Browse Gigs
                            </Button>
                        </Link>
                        <Link to="/messages">
                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Messages
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Posted Gigs</p>
                                <p className="text-2xl font-bold text-gray-100 mt-1">{stats.gigsPosted}</p>
                            </div>
                            <Briefcase className="h-8 w-8 text-gold-300" />
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Working On</p>
                                <p className="text-2xl font-bold text-gray-100 mt-1">{stats.gigsWorking}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Applications</p>
                                <p className="text-2xl font-bold text-gray-100 mt-1">{stats.applicationsPending}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Earned</p>
                                <p className="text-2xl font-bold text-gold-300 mt-1">SGD {stats.totalEarned.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-dark-100 border border-dark-50 rounded-lg p-1 flex gap-2 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('posted')}
                        className={`flex-1 min-w-30 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'posted'
                            ? 'bg-gold-300 text-dark-200'
                            : 'text-gray-400 hover:text-gray-100'
                            }`}
                    >
                        Posted ({stats.gigsPosted})
                    </button>
                    <button
                        onClick={() => setActiveTab('working')}
                        className={`flex-1 min-w-30 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'working'
                            ? 'bg-gold-300 text-dark-200'
                            : 'text-gray-400 hover:text-gray-100'
                            }`}
                    >
                        Working ({stats.gigsWorking})
                    </button>
                    <button
                        onClick={() => setActiveTab('applied')}
                        className={`flex-1 min-w-30 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'applied'
                            ? 'bg-gold-300 text-dark-200'
                            : 'text-gray-400 hover:text-gray-100'
                            }`}
                    >
                            Applied ({appliedGigs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 min-w-30 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'completed'
                            ? 'bg-gold-300 text-dark-200'
                            : 'text-gray-400 hover:text-gray-100'
                            }`}
                    >
                        Completed (0)
                    </button>
                </div>

                {/* Tab Content */}
                <div className="space-y-4 pb-12">
                    {/* Loading state */}
                    {jobsLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-300 mx-auto"></div>
                            <p className="text-gray-400 mt-4">Loading...</p>
                        </div>
                    )}

                    {/* Posted Gigs Tab */}
                    {!jobsLoading && activeTab === 'posted' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">Gigs I Posted</h2>
                            {postedGigs.length === 0 ? (
                                <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
                                    <Briefcase className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Gigs Posted Yet</h3>
                                    <p className="text-gray-500 mb-4">Post your first gig to start finding freelancers</p>
                                    <Link to="/post-gig">
                                        <Button className="flex items-center gap-2 mx-auto">
                                            <PlusCircle className="h-4 w-4" />
                                            Post a Gig
                                        </Button>
                                    </Link>
                                </div>
                            ) : null}
                            {postedGigs.map((gig) => (
                                <div key={gig.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-100">{gig.title}</h3>
                                                {getStatusBadge(gig.status)}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="px-2 py-1 bg-dark-50 text-gray-300 rounded text-xs">
                                                    {gig.category}
                                                </span>
                                                <span>{gig.applicants} applications</span>
                                                <span>Posted {gig.postedAt}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gold-300">SGD {gig.budget.toLocaleString()}</p>
                                            {gig.freelancer && (
                                                <p className="text-sm text-gray-400 mt-1">Working with {gig.freelancer}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link to={`/gigs/${gig.id}`}>
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                        {gig.status === 'reviewing' && (
                                            <Link to={`/applications/${gig.id}`}>
                                                <Button className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    Review Applications ({gig.applicants})
                                                </Button>
                                            </Link>
                                        )}
                                        <Button 
                                            variant="secondary" 
                                            className="flex items-center gap-2"
                                            onClick={() => handleEditGig(gig.id)}
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="secondary" 
                                            className="flex items-center gap-2 text-red-400 hover:text-red-300"
                                            onClick={() => handleCloseGig(gig.id, gig.title)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Working On Tab */}
                    {!jobsLoading && activeTab === 'working' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">Gigs I'm Working On</h2>
                            {workingGigs.length === 0 ? (
                                <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
                                    <Clock className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Not Working on Any Gigs</h3>
                                    <p className="text-gray-500 mb-4">Join a waitlist to start working as a freelancer</p>
                                    <Link to="/explore">
                                        <Button variant="secondary" className="mx-auto">Browse Gigs</Button>
                                    </Link>
                                </div>
                            ) : null}
                            {workingGigs.map((gig) => (
                                <div key={gig.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-100">{gig.title}</h3>
                                                {getStatusBadge(gig.status)}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="px-2 py-1 bg-dark-50 text-gray-300 rounded text-xs">
                                                    {gig.category}
                                                </span>
                                                <span>Client: {gig.client}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gold-300">SGD {gig.budget.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-gray-400">
                                                Current: {gig.currentPhase} (Phase {gig.phaseNumber}/{gig.totalPhases})
                                            </span>
                                            <span className="text-yellow-400">{gig.daysLeft} days left</span>
                                        </div>
                                        <div className="w-full bg-dark-200 rounded-full h-2">
                                            <div
                                                className="bg-gold-300 h-2 rounded-full transition-all"
                                                style={{ width: `${(gig.phaseNumber / gig.totalPhases) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link to={`/gigs/${gig.id}`}>
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View Gig
                                            </Button>
                                        </Link>
                                        <Link to="/messages">
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Message Client
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Applications Tab */}
                    {!jobsLoading && activeTab === 'applied' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">My Applications</h2>
                            {appliedGigs.length === 0 ? (
                                <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
                                    <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Applications Yet</h3>
                                    <p className="text-gray-500 mb-4">Join a waitlist to apply for gigs</p>
                                    <Link to="/explore">
                                        <Button variant="secondary" className="mx-auto">Browse Gigs</Button>
                                    </Link>
                                </div>
                            ) : null}
                            {appliedGigs.map((app) => (
                                <div key={app.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-100">{app.title}</h3>
                                                {getStatusBadge(app.status)}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="px-2 py-1 bg-dark-50 text-gray-300 rounded text-xs">
                                                    {app.category}
                                                </span>
                                                <span>Client: {app.client}</span>
                                                <span>Applied {app.appliedAt}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gold-300">SGD {Number(app.budget).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link to={`/gigs/${app.gigId}`}>
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View Gig
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Completed Tab */}
                    {!jobsLoading && activeTab === 'completed' && (
                        <div className="text-center py-12">
                            <CheckCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Completed Gigs Yet</h3>
                            <p className="text-gray-500">Your completed projects will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;