import { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import GigCard from '../components/common/GigCard';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredGigs, topFreelancers } from '../constants/mockData';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extended gig list for more variety (includes all categories)
  const allGigs = [
    ...featuredGigs,
    {
      id: 7,
      title: 'Logo Design for Startup',
      description: 'Need a modern, minimalist logo for a tech startup. Should be versatile and work well in both color and black/white.',
      budget: 500,
      location: 'Remote',
      postedAt: '1 hour ago',
      category: 'Design',
      clientName: 'TechStart Inc.',
      saved: false,
    },
    {
      id: 8,
      title: 'Python Backend Developer',
      description: 'Looking for an experienced Python developer to build REST APIs using Flask. Must have experience with PostgreSQL.',
      budget: 4000,
      location: 'Remote',
      postedAt: '3 hours ago',
      category: 'Development',
      clientName: 'DevCorp',
      saved: false,
    },
    {
      id: 9,
      title: 'Email Marketing Campaign',
      description: 'Create and execute email marketing campaign for product launch. Includes copywriting and design.',
      budget: 1500,
      location: 'Singapore',
      postedAt: '1 day ago',
      category: 'Marketing',
      clientName: 'MarketHub',
      saved: false,
    },
    {
      id: 10,
      title: 'Business Plan Writer',
      description: 'Need help writing a comprehensive business plan for investors. Must include financial projections and market analysis.',
      budget: 2500,
      location: 'Singapore',
      postedAt: '2 hours ago',
      category: 'Business',
      clientName: 'StartupCo',
      saved: false,
    },
    {
      id: 11,
      title: 'Financial Consultant',
      description: 'Looking for a financial advisor to help with business restructuring and cost optimization strategies.',
      budget: 3500,
      location: 'Remote',
      postedAt: '5 hours ago',
      category: 'Business',
      clientName: 'GrowthPartners',
      saved: false,
    },
    {
      id: 12,
      title: 'Music Producer for Podcast Intro',
      description: 'Need a catchy 30-second intro music for a business podcast. Should be upbeat and professional.',
      budget: 800,
      location: 'Remote',
      postedAt: '1 day ago',
      category: 'Music',
      clientName: 'PodcastPro',
      saved: false,
    },
    {
      id: 14,
      title: 'Video Editor for YouTube',
      description: 'Looking for ongoing video editing for weekly YouTube videos. Experience with Adobe Premiere Pro required.',
      budget: 600,
      location: 'Indonesia',
      postedAt: '2 days ago',
      category: 'Video',
      clientName: 'ContentKing',
      saved: false,
    },
  ];

  const categories = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video', 'Photography', 'Music', 'Business'];

  // Filter gigs based on selected category
  const filteredGigs = selectedCategory === 'All' 
    ? allGigs.slice(0, 6) // Show first 6 when "All" is selected
    : allGigs.filter(gig => gig.category === selectedCategory).slice(0, 6); // Show up to 6 from selected category

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-b from-dark-100 to-dark-200 border-b border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gold-300 mb-6 leading-tight">
              Find Top Talent or Your Next Gig
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with skilled freelancers or discover opportunities that match your expertise. 
              Secure payments with milestone-based escrow.
            </p>
            
            <div className="flex justify-center mb-8">
              <SearchBar />
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gold-300" />
                <span>500+ Active Gigs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold-300" />
                <span>1,000+ Freelancers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gold-300">SGD 100K+</span>
                <span>Paid Out</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills - NOW FUNCTIONAL */}
      <section className="py-8 bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gold-300 text-dark-200 border-gold-300'
                    : 'bg-dark-100 border border-dark-50 text-gray-400 hover:border-gold-300 hover:text-gold-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs Section - NOW FILTERED */}
      <section className="py-12 bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gold-300">
              {selectedCategory === 'All' ? 'Featured Gigs' : `${selectedCategory} Gigs`}
            </h2>
            <Link 
              to="/explore" 
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {filteredGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
              <p className="text-gray-400 text-lg">No gigs found in this category.</p>
              <p className="text-gray-500 text-sm mt-2">Try selecting a different category or view all gigs.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-6 py-2 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-colors font-medium"
              >
                View All Categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="py-12 bg-dark-100 border-y border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gold-300">Top Freelancers</h2>
            <Link 
              to="/freelancers" 
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFreelancers.map((freelancer) => (
              <div 
                key={freelancer.id}
                className="bg-dark-200 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-all text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gold-300 mx-auto mb-4 flex items-center justify-center text-dark-200 font-bold text-2xl">
                  {freelancer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1">{freelancer.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{freelancer.title}</p>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-gold-300 fill-gold-300" />
                    <span>{freelancer.rating}</span>
                  </div>
                  <span>{freelancer.completedGigs} gigs</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {freelancer.skills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-dark-100 text-gray-400 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/profile/${freelancer.id}`}
                  className="text-gold-300 text-sm hover:text-gold-200 transition-colors"
                >
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;