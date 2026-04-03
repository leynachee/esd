import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Star, Briefcase, CheckCircle,
  Edit, Settings, MessageSquare, Share2,
  Calendar, DollarSign, Award
} from 'lucide-react';
import Button from '../components/common/Button';
import GigCard from '../components/common/GigCard';
import { featuredGigs } from '../constants/mockData';

// Extended freelancer profiles data
const freelancerProfiles = {
  1: {
    id: 1,
    name: 'Alex Chen',
    username: '@alexchen',
    location: 'Singapore',
    memberSince: 'March 2024',
    bio: 'Full-stack developer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud architecture. Passionate about creating clean, efficient code and delivering exceptional user experiences.',
    freelancerStats: {
      rating: 4.9,
      reviewCount: 87,
      completedGigs: 124,
      totalEarned: 45000,
      successRate: 98,
      responseTime: '2 hours',
    },
    clientStats: {
      rating: 4.7,
      reviewCount: 23,
      gigsPosted: 23,
      totalSpent: 12000,
      hireRate: 95,
    },
    skills: [
      'React', 'Node.js', 'Python', 'TypeScript',
      'AWS', 'MongoDB', 'PostgreSQL', 'Docker',
      'GraphQL', 'REST API', 'CI/CD', 'Agile'
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Mandarin', level: 'Fluent' },
      { name: 'Malay', level: 'Conversational' },
    ],
    certifications: [
      { name: 'AWS Certified Developer', year: 2023 },
      { name: 'Google Cloud Professional', year: 2022 },
    ],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with React and Node.js',
        tags: ['React', 'Node.js', 'MongoDB'],
      },
      {
        id: 2,
        title: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard for SaaS product',
        tags: ['React', 'D3.js', 'WebSocket'],
      },
    ],
    reviews: [
      {
        id: 1,
        clientName: 'Sarah M.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent work! Alex delivered the project ahead of schedule and exceeded expectations. Highly recommended!',
        gigTitle: 'Website Development',
      },
      {
        id: 2,
        clientName: 'TechCorp',
        rating: 5,
        date: '1 month ago',
        comment: 'Great communication and technical skills. Will definitely hire again.',
        gigTitle: 'API Integration',
      },
      {
        id: 3,
        clientName: 'Mike T.',
        rating: 4,
        date: '2 months ago',
        comment: 'Good work overall. Minor revisions needed but handled professionally.',
        gigTitle: 'Dashboard Development',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Maya Patel',
    username: '@mayapatel',
    location: 'Singapore',
    memberSince: 'January 2023',
    bio: 'Award-winning UI/UX designer with a passion for creating intuitive, user-centered designs. Specialized in mobile app design, prototyping, and design systems. 5+ years of experience working with startups and enterprises.',
    freelancerStats: {
      rating: 5.0,
      reviewCount: 64,
      completedGigs: 98,
      totalEarned: 38000,
      successRate: 100,
      responseTime: '1 hour',
    },
    clientStats: {
      rating: 4.8,
      reviewCount: 12,
      gigsPosted: 12,
      totalSpent: 8500,
      hireRate: 92,
    },
    skills: [
      'Figma', 'Adobe XD', 'Sketch', 'Prototyping',
      'User Research', 'Wireframing', 'Design Systems',
      'Interaction Design', 'Mobile UI', 'Responsive Design'
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi', level: 'Native' },
      { name: 'Tamil', level: 'Conversational' },
    ],
    certifications: [
      { name: 'Google UX Design Certificate', year: 2023 },
      { name: 'Nielsen Norman Group UX', year: 2022 },
    ],
    portfolio: [
      {
        id: 1,
        title: 'Fitness Tracking App',
        description: 'Complete UI/UX design for iOS and Android fitness app',
        tags: ['Figma', 'Mobile UI', 'Prototyping'],
      },
      {
        id: 2,
        title: 'Banking Dashboard',
        description: 'Enterprise banking dashboard with complex data visualization',
        tags: ['Adobe XD', 'Dashboard', 'Finance'],
      },
    ],
    reviews: [
      {
        id: 1,
        clientName: 'StartupXYZ',
        rating: 5,
        date: '1 week ago',
        comment: 'Maya\'s designs are stunning! She understood our vision perfectly and delivered beyond expectations.',
        gigTitle: 'Mobile App Design',
      },
      {
        id: 2,
        clientName: 'David L.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Professional, creative, and easy to work with. Highly recommend!',
        gigTitle: 'Website Redesign',
      },
    ],
  },
  3: {
    id: 3,
    name: 'James Wilson',
    username: '@jameswilson',
    location: 'Remote',
    memberSince: 'June 2022',
    bio: 'Professional content writer and SEO specialist with 6+ years of experience. Expert in tech, business, and lifestyle content. Published in major publications and helped 100+ businesses grow their online presence through strategic content.',
    freelancerStats: {
      rating: 4.8,
      reviewCount: 156,
      completedGigs: 203,
      totalEarned: 52000,
      successRate: 96,
      responseTime: '3 hours',
    },
    clientStats: {
      rating: 4.6,
      reviewCount: 8,
      gigsPosted: 8,
      totalSpent: 4200,
      hireRate: 88,
    },
    skills: [
      'SEO Writing', 'Copywriting', 'Content Strategy',
      'Blogging', 'Technical Writing', 'Email Marketing',
      'Research', 'Editing', 'WordPress', 'Google Analytics'
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Intermediate' },
    ],
    certifications: [
      { name: 'HubSpot Content Marketing', year: 2023 },
      { name: 'Google Analytics Certified', year: 2022 },
    ],
    portfolio: [
      {
        id: 1,
        title: 'Tech Blog Series',
        description: '50+ articles on AI, blockchain, and emerging tech for major publication',
        tags: ['SEO', 'Tech Writing', 'Research'],
      },
      {
        id: 2,
        title: 'SaaS Content Strategy',
        description: 'Complete content strategy and execution for B2B SaaS startup',
        tags: ['Content Strategy', 'B2B', 'Copywriting'],
      },
    ],
    reviews: [
      {
        id: 1,
        clientName: 'TechBlog Inc.',
        rating: 5,
        date: '5 days ago',
        comment: 'James consistently delivers high-quality, well-researched content. Great SEO optimization!',
        gigTitle: 'Blog Content Writing',
      },
      {
        id: 2,
        clientName: 'Emily R.',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Solid work. Met all deadlines and requirements. Minor edits needed.',
        gigTitle: 'Website Copy',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofia Rodriguez',
    username: '@sofiarodriguez',
    location: 'Malaysia',
    memberSince: 'September 2023',
    bio: 'Creative video editor specializing in YouTube content, social media videos, and brand storytelling. Proficient in Premiere Pro, After Effects, and DaVinci Resolve. 4+ years creating engaging video content that drives views and engagement.',
    freelancerStats: {
      rating: 4.9,
      reviewCount: 78,
      completedGigs: 156,
      totalEarned: 41000,
      successRate: 97,
      responseTime: '2 hours',
    },
    clientStats: {
      rating: 4.5,
      reviewCount: 5,
      gigsPosted: 5,
      totalSpent: 2800,
      hireRate: 90,
    },
    skills: [
      'Premiere Pro', 'After Effects', 'DaVinci Resolve',
      'Motion Graphics', 'Color Grading', 'Sound Design',
      'Video Editing', 'Animation', 'YouTube', 'Social Media'
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Spanish', level: 'Native' },
      { name: 'Portuguese', level: 'Conversational' },
    ],
    certifications: [
      { name: 'Adobe Certified Professional', year: 2023 },
      { name: 'DaVinci Resolve Certification', year: 2023 },
    ],
    portfolio: [
      {
        id: 1,
        title: 'YouTube Channel Growth',
        description: 'Edited 200+ videos for tech YouTube channel with 500K+ subscribers',
        tags: ['Premiere Pro', 'YouTube', 'Thumbnails'],
      },
      {
        id: 2,
        title: 'Brand Video Campaign',
        description: 'Created promotional video series for fashion brand social media',
        tags: ['After Effects', 'Motion Graphics', 'Branding'],
      },
    ],
    reviews: [
      {
        id: 1,
        clientName: 'CreatorStudio',
        rating: 5,
        date: '4 days ago',
        comment: 'Sofia is amazing! Fast turnaround, creative edits, and always delivers top quality.',
        gigTitle: 'YouTube Video Editing',
      },
      {
        id: 2,
        clientName: 'Fashion Brand Co.',
        rating: 5,
        date: '1 week ago',
        comment: 'Exceeded expectations! The videos look professional and polished.',
        gigTitle: 'Social Media Videos',
      },
    ],
  },
};

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');

  // Determine if viewing own profile or another user's profile
  const isOwnProfile = !userId;

  // Get user data based on userId (default to user 1 if viewing own profile)
  const profileId = userId ? parseInt(userId) : 1;
  const user = freelancerProfiles[profileId] || freelancerProfiles[1]; // Fallback to Alex if ID not found

  const activeGigs = featuredGigs.slice(0, 3);

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-dark-100 border border-dark-50 rounded-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-4xl shrink-0">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gold-300">{user.name}</h1>
                  <p className="text-gray-400">{user.username}</p>
                </div>
                {isOwnProfile ? (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/settings')}
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                    <Button variant="secondary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.memberSince}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{user.bio}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-gold-300 fill-gold-300" />
                    <span className="text-xl font-bold text-gray-100">{user.freelancerStats.rating}</span>
                  </div>
                  <p className="text-xs text-gray-400">{user.freelancerStats.reviewCount} reviews</p>
                </div>
                <div className="bg-dark-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xl font-bold text-gray-100">{user.freelancerStats.completedGigs}</span>
                  </div>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
                <div className="bg-dark-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-gold-300" />
                    <span className="text-xl font-bold text-gray-100">SGD {(user.freelancerStats.totalEarned / 1000).toFixed(0)}K</span>
                  </div>
                  <p className="text-xs text-gray-400">Earned</p>
                </div>
                <div className="bg-dark-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-blue-400" />
                    <span className="text-xl font-bold text-gray-100">{user.freelancerStats.successRate}%</span>
                  </div>
                  <p className="text-xs text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-dark-100 rounded-lg p-1 flex gap-2">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'portfolio'
                    ? 'bg-gold-300 text-dark-200'
                    : 'text-gray-400 hover:text-gray-100'
                  }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'reviews'
                    ? 'bg-gold-300 text-dark-200'
                    : 'text-gray-400 hover:text-gray-100'
                  }`}
              >
                Reviews ({user.reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('gigs')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'gigs'
                    ? 'bg-gold-300 text-dark-200'
                    : 'text-gray-400 hover:text-gray-100'
                  }`}
              >
                Active Gigs
              </button>
            </div>

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gold-300">Portfolio</h2>
                {user.portfolio.map((item) => (
                  <div key={item.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-dark-50 text-gray-300 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gold-300">Reviews</h2>
                {user.reviews.map((review) => (
                  <div key={review.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">{review.clientName}</h3>
                        <p className="text-sm text-gray-400">{review.gigTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating
                                  ? 'text-gold-300 fill-gold-300'
                                  : 'text-gray-500'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Active Gigs Tab */}
            {activeTab === 'gigs' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gold-300">Active Gigs</h2>
                <div className="grid grid-cols-1 gap-4">
                  {activeGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-dark-50 text-gray-300 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">Languages</h3>
              <div className="space-y-2">
                {user.languages.map((lang) => (
                  <div key={lang.name} className="flex justify-between items-center">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">Certifications</h3>
              <div className="space-y-3">
                {user.certifications.map((cert) => (
                  <div key={cert.name}>
                    <p className="text-gray-300 font-medium">{cert.name}</p>
                    <p className="text-gray-400 text-sm">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* As Client Stats */}
            <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">As a Client</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-gold-300 fill-gold-300" />
                    <span className="text-gray-100 font-semibold">{user.clientStats.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gigs Posted</span>
                  <span className="text-gray-100 font-semibold">{user.clientStats.gigsPosted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Spent</span>
                  <span className="text-gray-100 font-semibold">SGD {user.clientStats.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;