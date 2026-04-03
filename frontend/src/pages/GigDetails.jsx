import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, Clock, Bookmark, Share2, Flag,
    DollarSign, Calendar, Users, Star,
    ArrowLeft, CheckCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import { featuredGigs } from '../constants/mockData';

// Shared bookmark utilities
const SAVED_GIGS_KEY = 'freelancehub_saved_gigs';

const getSavedGigs = () => {
    try {
        const saved = localStorage.getItem(SAVED_GIGS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
};

const isGigSaved = (gigId) => {
    return getSavedGigs().includes(gigId);
};

const toggleSaveGig = (gigId) => {
    const savedGigs = getSavedGigs();
    const isSaved = savedGigs.includes(gigId);
    
    if (isSaved) {
        const filtered = savedGigs.filter(id => id !== gigId);
        localStorage.setItem(SAVED_GIGS_KEY, JSON.stringify(filtered));
    } else {
        savedGigs.push(gigId);
        localStorage.setItem(SAVED_GIGS_KEY, JSON.stringify(savedGigs));
    }
    
    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent('savedGigsChanged', { 
        detail: { gigId, action: isSaved ? 'unsaved' : 'saved' } 
    }));
    
    return !isSaved;
};

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(() => isGigSaved(parseInt(id)));
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showFlagModal, setShowFlagModal] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    // Listen for bookmark changes from other components
    useEffect(() => {
        const handleSavedGigsChanged = (event) => {
            if (event.detail.gigId === parseInt(id)) {
                setIsSaved(event.detail.action === 'saved');
            }
        };

        window.addEventListener('savedGigsChanged', handleSavedGigsChanged);
        
        return () => {
            window.removeEventListener('savedGigsChanged', handleSavedGigsChanged);
        };
    }, [id]);

    // Find the gig (in real app, fetch from API)
    const gig = featuredGigs.find(g => g.id === parseInt(id)) || featuredGigs[0];

    // Mock data for this gig
    const gigDetails = {
        ...gig,
        fullDescription: `${gig.description}\n\nWe are looking for a talented professional who can deliver high-quality work within the specified timeline. This is a great opportunity to showcase your skills and build your portfolio.\n\nRequirements:\n- Proven experience in ${gig.category.toLowerCase()}\n- Strong portfolio demonstrating relevant work\n- Excellent communication skills\n- Ability to meet deadlines\n- Attention to detail\n\nDeliverables:\n- High-quality final product\n- Source files (if applicable)\n- Revisions as per agreed milestones`,
        skills: ['Photography', 'Photo Editing', 'Adobe Lightroom', 'Event Coverage'],
        timeline: '4 weeks',
        applicants: 12,
        clientRating: 4.8,
        clientGigsPosted: 23,
        milestones: [
            { id: 1, name: 'Initial Consultation', amount: 300, deadline: '1 week' },
            { id: 2, name: 'Event Coverage', amount: 800, deadline: '2 weeks' },
            { id: 3, name: 'Final Edits & Delivery', amount: 400, deadline: '4 weeks' },
        ],
    };

    const handleApply = () => {
        // Check if user is logged in (we'll implement this with Zustand later)
        const isLoggedIn = false; // Placeholder

        if (!isLoggedIn) {
            navigate('/auth');
        } else {
            setShowApplyModal(true);
        }
    };

    const handleSave = () => {
        const newState = toggleSaveGig(parseInt(id));
        setIsSaved(newState);
        
        // Show feedback
        console.log(newState ? 'Gig saved!' : 'Gig removed from saved');
    };

    const handleShare = async () => {
        const url = window.location.href;
        
        // Try native share API first (works on mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: gigDetails.title,
                    text: `Check out this gig: ${gigDetails.title}`,
                    url: url
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                setShowShareTooltip(true);
                setTimeout(() => setShowShareTooltip(false), 2000);
            } catch (err) {
                console.error('Copy failed:', err);
                alert('Could not copy link. Please copy manually: ' + url);
            }
        }
    };

    const handleFlag = () => {
        setShowFlagModal(true);
    };

    const handleSubmitFlag = (reason) => {
        // TODO: In production, send to backend
        // await apiClient.post('/gigs/report', { gigId: id, reason });
        console.log('Flagged gig with reason:', reason);
        setShowFlagModal(false);
        alert('Thank you for your report. We will review this gig.');
    };

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
                                        {gigDetails.category}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-100 mb-2">
                                        {gigDetails.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{gigDetails.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>Posted {gigDetails.postedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{gigDetails.applicants} applicants</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Bookmark/Save Button */}
                                    <button
                                        onClick={handleSave}
                                        className="p-2 text-gray-400 hover:text-gold-300 transition-colors relative group"
                                        title={isSaved ? "Remove from saved" : "Save gig"}
                                    >
                                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-gold-300 text-gold-300' : ''}`} />
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-50 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {isSaved ? 'Saved' : 'Save gig'}
                                        </span>
                                    </button>
                                    
                                    {/* Share Button */}
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
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-50 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            Share
                                        </span>
                                    </button>
                                    
                                    {/* Flag/Report Button */}
                                    <button 
                                        onClick={handleFlag}
                                        className="p-2 text-gray-400 hover:text-red-400 transition-colors relative group"
                                        title="Report this gig"
                                    >
                                        <Flag className="h-5 w-5" />
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-50 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            Report
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-6 w-6 text-gold-300" />
                                <span className="text-3xl font-bold text-gold-300">
                                    SGD {gigDetails.budget.toLocaleString()}
                                </span>
                                <span className="text-gray-400">Fixed Price</span>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-50">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Timeline</p>
                                    <p className="text-gray-100 font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gold-300" />
                                        {gigDetails.timeline}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Experience Level</p>
                                    <p className="text-gray-100 font-semibold">Intermediate</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gold-300 mb-4">Description</h2>
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                {gigDetails.fullDescription}
                            </p>
                        </div>

                        {/* Skills Required */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gold-300 mb-4">Skills Required</h2>
                            <div className="flex flex-wrap gap-2">
                                {gigDetails.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-2 bg-dark-200 border border-dark-50 text-gray-300 rounded-lg text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Milestones - FIXED CONTRAST */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gold-300 mb-4">Project Milestones</h2>
                            <p className="text-gray-300 mb-4">
                                Work is divided into phases for better tracking. Full payment of SGD {gigDetails.budget.toLocaleString()} is released upon project completion.
                            </p>
                            <div className="space-y-4">
                                {gigDetails.milestones.map((milestone, index) => (
                                    <div
                                        key={milestone.id}
                                        className="flex items-center justify-between p-4 bg-dark-200 border border-dark-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-gray-100 font-semibold">{milestone.name}</h3>
                                                <p className="text-gray-400 text-sm">Target: {milestone.deadline}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* FIXED: Changed from low opacity gold background to high contrast design */}
                            <div className="mt-6 p-5 bg-gold-300 rounded-lg">
                                <div className="mb-3">
                                    <p className="text-dark-200 text-sm font-medium mb-1">
                                        Total Payment (upon completion)
                                    </p>
                                    <p className="text-3xl font-bold text-dark-200">
                                        SGD {gigDetails.budget.toLocaleString()}
                                    </p>
                                </div>
                                <p className="text-dark-200 text-sm font-medium">
                                    ✓ Held in secure escrow • Released when all work is approved
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Card */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <Button onClick={handleApply} className="w-full mb-4">
                                Apply for This Gig
                            </Button>
                            <p className="text-gray-400 text-sm text-center mb-4">
                                Escrow protection • Payment upon completion
                            </p>

                            <div className="space-y-3 pt-4 border-t border-dark-50">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <span>Payment verified</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <span>Client identity verified</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <span>Secure escrow payments</span>
                                </div>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gold-300 mb-4">About the Client</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-lg">
                                    {gigDetails.clientName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-gray-100 font-semibold">{gigDetails.clientName}</h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <Star className="h-3 w-3 text-gold-300 fill-gold-300" />
                                        <span>{gigDetails.clientRating} ({gigDetails.clientGigsPosted} gigs)</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                                Verified client with a history of successful projects
                            </p>
                            <Link
                                to={`/profile/${gigDetails.clientName}`}
                                className="text-gold-300 text-sm hover:text-gold-200 transition-colors font-medium"
                            >
                                View Client Profile →
                            </Link>
                        </div>

                        {/* Similar Gigs */}
                        <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gold-300 mb-4">Similar Gigs</h3>
                            <div className="space-y-3">
                                {featuredGigs.slice(0, 3).map((similarGig) => (
                                    <Link
                                        key={similarGig.id}
                                        to={`/gigs/${similarGig.id}`}
                                        className="block p-3 bg-dark-200 border border-dark-50 rounded-lg hover:border-gold-400 transition-colors"
                                    >
                                        <h4 className="text-gray-100 font-medium text-sm mb-1">
                                            {similarGig.title}
                                        </h4>
                                        <p className="text-gold-300 text-sm font-semibold">
                                            SGD {similarGig.budget.toLocaleString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal (Simple version - we'll enhance later) */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-gold-300 mb-4">Apply for Gig</h2>
                        <p className="text-gray-300 mb-4">
                            Application feature coming soon! This will be connected to your backend.
                        </p>
                        <div className="flex gap-3">
                            <Button onClick={() => setShowApplyModal(false)} variant="secondary" className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={() => setShowApplyModal(false)} className="flex-1">
                                Submit Application
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Flag/Report Modal */}
            {showFlagModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <Flag className="h-6 w-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-gray-100">Report This Gig</h2>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4">
                            Please select a reason for reporting this gig. Our team will review it.
                        </p>

                        <div className="space-y-2 mb-6">
                            {[
                                'Spam or misleading',
                                'Inappropriate content',
                                'Scam or fraud',
                                'Duplicate posting',
                                'Payment issues',
                                'Other violation'
                            ].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => handleSubmitFlag(reason)}
                                    className="w-full text-left px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-300 hover:border-red-400 hover:bg-dark-50 transition-colors"
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>

                        <Button 
                            onClick={() => setShowFlagModal(false)} 
                            variant="secondary" 
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GigDetails;