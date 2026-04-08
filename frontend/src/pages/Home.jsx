import { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import GigCard from '../components/common/GigCard';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';

// Map backend job object to GigCard-compatible shape
const mapJobToGig = (job) => ({
  id: job.EventID,
  title: job.EventType,
  description: `Budget: SGD ${job.EventWage} — Due: ${job.EventDueDate}`,
  budget: job.EventWage,
  location: 'Singapore',
  postedAt: job.EventStartDate || 'Recently',
  category: job.EventType,
  clientName: `Client #${job.ClientID}`,
});

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: jobsData, isLoading, isError } = useJobs();

  const allGigs = jobsData ? jobsData.map(mapJobToGig) : [];

  const categories = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video', 'Photography', 'Music', 'Business'];

  const filteredGigs = selectedCategory === 'All'
    ? allGigs.slice(0, 6)
    : allGigs.filter(gig => gig.category === selectedCategory).slice(0, 6);

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

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-300 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading gigs...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
              <p className="text-gray-400 text-lg">Could not load gigs. Make sure the backend is running.</p>
            </div>
          ) : filteredGigs.length > 0 ? (
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

      {/* CTA Section */}
      <section className="py-12 bg-dark-100 border-y border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gold-300 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Post a gig as a client or join the waitlist as a freelancer. Payments are handled securely via Stripe.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/post-gig"
              className="px-8 py-3 bg-gold-300 text-dark-200 rounded-lg font-semibold hover:bg-gold-200 transition-colors"
            >
              Post a Gig
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3 border border-gold-300 text-gold-300 rounded-lg font-semibold hover:bg-gold-300/10 transition-colors"
            >
              Browse Gigs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;