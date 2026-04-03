import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  ExternalLink,
  Calendar,
  DollarSign,
  MessageSquare,
  Award
} from 'lucide-react';
import { getApplicantsByGigId, getGigById } from '../constants/mockData';

const Applications = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match'); // match, rating, recent
  const [filterRating, setFilterRating] = useState('all'); // all, 4.5+, 4.8+

  const gig = getGigById(gigId);
  const applicants = getApplicantsByGigId(parseInt(gigId));

  if (!gig) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Gig Not Found</h2>
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

  // Filter applicants
  let filteredApplicants = [...applicants];

  // Search filter
  if (searchQuery) {
    filteredApplicants = filteredApplicants.filter(app =>
      app.freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Rating filter
  if (filterRating === '4.5+') {
    filteredApplicants = filteredApplicants.filter(app => app.freelancer.rating >= 4.5);
  } else if (filterRating === '4.8+') {
    filteredApplicants = filteredApplicants.filter(app => app.freelancer.rating >= 4.8);
  }

  // Sort applicants
  filteredApplicants.sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'rating') return b.freelancer.rating - a.freelancer.rating;
    if (sortBy === 'recent') return new Date(b.appliedAt) - new Date(a.appliedAt);
    return 0;
  });

  const handleAccept = (applicantId) => {
    // Navigate to escrow payment page
    navigate(`/escrow/${applicantId}`);
  };

  const handleReject = (applicantId) => {
    // TODO: In real app, this would trigger API call
    if (confirm('Are you sure you want to reject this application?')) {
      alert(`Rejected applicant ${applicantId}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
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

          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">{gig.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gold-300" />
                    <span className="text-gold-300 font-medium">SGD {gig.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>{gig.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{gig.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-dark-50 text-gray-300 rounded-full text-xs">
                    {gig.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-300">{applicants.length}</div>
                  <div className="text-sm text-gray-400">Applicants</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
              >
                <option value="match">Best Match</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>

            {/* Rating Filter */}
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2.5 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
            >
              <option value="all">All Ratings</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.8+">4.8+ Stars</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-dark-50">
            <p className="text-sm text-gray-400">
              Showing <span className="text-gray-200 font-medium">{filteredApplicants.length}</span> of{' '}
              <span className="text-gray-200 font-medium">{applicants.length}</span> applicants
            </p>
          </div>
        </div>

        {/* Applicants List */}
        <div className="space-y-6">
          {filteredApplicants.length === 0 ? (
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-12 text-center">
              <p className="text-gray-400">No applicants found matching your criteria.</p>
            </div>
          ) : (
            filteredApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-dark-100 rounded-lg border border-dark-50 p-6 hover:border-gold-300/30 transition-all"
              >
                {/* Applicant Header */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  {/* Profile Section */}
                  <div className="flex gap-4 flex-1">
                    <img
                      src={applicant.freelancer.avatar}
                      alt={applicant.freelancer.name}
                      className="w-16 h-16 rounded-full bg-dark-50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-100 mb-1">
                            {applicant.freelancer.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-gray-200 font-medium">
                                {applicant.freelancer.rating}
                              </span>
                              <span>({applicant.freelancer.reviewCount})</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{applicant.freelancer.completedGigs} gigs</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{applicant.freelancer.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-200 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            Responds in {applicant.freelancer.responseTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-200 rounded-lg">
                          <DollarSign className="w-4 h-4 text-gold-300" />
                          <span className="text-sm text-gray-300">
                            SGD {applicant.freelancer.hourlyRate}/hr
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-200 rounded-lg">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            Member since {applicant.freelancer.memberSince}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-dark-50"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - applicant.matchScore / 100)}`}
                          className="text-gold-300"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gold-300">
                            {applicant.matchScore}
                          </div>
                          <div className="text-xs text-gray-400">match</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 lg:text-right">
                      Applied {formatDate(applicant.appliedAt)}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {applicant.freelancer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dark-50 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-4 p-4 bg-dark-200 rounded-lg border border-dark-50">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Cover Letter
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {applicant.coverLetter}
                  </p>
                </div>

                {/* Proposed Timeline */}
                <div className="mb-4 p-4 bg-dark-200 rounded-lg border border-dark-50">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Proposed Timeline
                  </h4>
                  <p className="text-sm text-gray-400">{applicant.proposedTimeline}</p>
                </div>

                {/* Portfolio */}
                {applicant.portfolio && applicant.portfolio.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Portfolio Samples
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {applicant.portfolio.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden bg-dark-50 group relative"
                        >
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-dark-50">
                  <button
                    onClick={() => navigate(`/profile/${applicant.freelancer.id}`)}
                    className="flex-1 px-6 py-3 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 hover:bg-dark-200 transition-all"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleReject(applicant.id)}
                    className="flex-1 px-6 py-3 bg-red-400/20 text-red-300 rounded-lg hover:bg-red-400/30 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(applicant.id)}
                    className="flex-1 px-6 py-3 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept & Pay to Escrow
                  </button>
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