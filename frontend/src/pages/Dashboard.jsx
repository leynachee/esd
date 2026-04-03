import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase, Clock, CheckCircle, XCircle,
    PlusCircle, TrendingUp, DollarSign, Users,
    Eye, Edit, Trash2, MessageSquare
} from 'lucide-react';
import Button from '../components/common/Button';
import { featuredGigs } from '../constants/mockData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posted');

    // Mock user data
    const user = {
        name: 'John Doe',
        role: 'Client & Freelancer',
    };

    // Use actual gigs from mockData instead of hardcoded data
    const postedGigs = [
        {
            id: 1,  // Wedding Photography - from featuredGigs
            title: 'Wedding Photography Needed',
            budget: 1500,
            applicants: 8,
            status: 'reviewing',
            postedAt: '2 days ago',
            category: 'Photography',
        },
        {
            id: 2,  // Mobile App UI/UX Design - from featuredGigs
            title: 'Website Redesign',
            budget: 3500,
            applicants: 15,
            status: 'in_progress',
            postedAt: '1 week ago',
            category: 'Design',
            freelancer: 'Alex Chen',
        },
    ];

    const workingGigs = [
        {
            id: 1,  // Using featuredGigs ID 1 (Wedding Photography)
            contractId: 1,  // Contract ID for routing
            title: 'Corporate Event Coverage',
            budget: 2000,
            client: 'Sarah M.',
            status: 'in_progress',
            currentPhase: 'Event Coverage',
            phaseNumber: 2,
            totalPhases: 3,
            daysLeft: 3,
            category: 'Photography',
        },
    ];

    const pendingApplications = [
        {
            id: 1,  // Application ID
            gigId: 4,  // Social Media Manager (from featuredGigs)
            title: 'Social Media Manager',
            budget: 1200,
            client: 'StyleHub',
            appliedAt: '2 days ago',
            status: 'under_review',
            category: 'Marketing',
        },
        {
            id: 2,  // Application ID
            gigId: 6,  // Video Editor for YouTube Channel (from featuredGigs)
            title: 'Video Editor for YouTube Channel',
            budget: 600,
            client: 'CreatorStudio',
            appliedAt: '5 days ago',
            status: 'under_review',
            category: 'Video',
        },
    ];

    // Mock stats
    const stats = {
        gigsPosted: postedGigs.length,
        gigsWorking: workingGigs.length,
        applicationsPending: pendingApplications.length,
        totalEarned: 4500,
        totalSpent: 1800,
    };

    const getStatusBadge = (status) => {
        const styles = {
            reviewing: 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-400',
            in_progress: 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-400',
            completed: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400',
            under_review: 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-400',
        };

        const labels = {
            reviewing: 'Reviewing Applications',
            in_progress: 'In Progress',
            completed: 'Completed',
            under_review: 'Under Review',
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

    const handleWithdrawApplication = (appId, gigTitle) => {
        if (window.confirm(`Are you sure you want to withdraw your application for "${gigTitle}"?`)) {
            // TODO: Connect to backend API
            alert(`Application withdrawn for "${gigTitle}". (Will be connected to backend)`);
            // In production: await apiClient.delete(`/applications/${appId}`);
        }
    };

    return (
        <div className="min-h-screen bg-dark-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gold-300 mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.name}</p>
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
                        Applied ({stats.applicationsPending})
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
                    {/* Posted Gigs Tab */}
                    {activeTab === 'posted' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">Gigs I Posted</h2>
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
                    {activeTab === 'working' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">Gigs I'm Working On</h2>
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
                                        <Link to={`/contracts/${gig.contractId}`}>
                                            <Button className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" />
                                                Upload Work
                                            </Button>
                                        </Link>
                                        <Link to="/messages">
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Message Client
                                            </Button>
                                        </Link>
                                        <Link to={`/contracts/${gig.contractId}`}>
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View Contract
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Applications Tab */}
                    {activeTab === 'applied' && (
                        <>
                            <h2 className="text-2xl font-bold text-gold-300 mb-4">Applications Pending</h2>
                            {pendingApplications.map((app) => (
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
                                            <p className="text-2xl font-bold text-gold-300">SGD {app.budget.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link to={`/gigs/${app.gigId}`}>
                                            <Button variant="secondary" className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View Gig
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="secondary" 
                                            className="flex items-center gap-2 text-red-400 hover:text-red-300"
                                            onClick={() => handleWithdrawApplication(app.id, app.title)}
                                        >
                                            <XCircle className="h-4 w-4" />
                                            Withdraw Application
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Completed Tab */}
                    {activeTab === 'completed' && (
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