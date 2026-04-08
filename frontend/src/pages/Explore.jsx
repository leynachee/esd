import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import GigCard from '../components/common/GigCard';
import Button from '../components/common/Button';
import { useJobs } from '../hooks/useJobs';

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

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [budgetRange, setBudgetRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');

  const { data: jobsData, isLoading, isError } = useJobs();

  const categories = [
    'All',
    'Design',
    'Development',
    'Writing',
    'Marketing',
    'Video',
    'Photography',
    'Music',
    'Business',
  ];

  const locations = ['All', 'Remote', 'Singapore', 'Malaysia', 'Indonesia'];

  const allGigs = jobsData ? jobsData.map(mapJobToGig) : [];

  // Filter and sort logic
  const filteredGigs = allGigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLocation = selectedLocation === 'all' || gig.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesBudget = 
      (!budgetRange.min || gig.budget >= parseInt(budgetRange.min)) &&
      (!budgetRange.max || gig.budget <= parseInt(budgetRange.max));

    return matchesSearch && matchesCategory && matchesLocation && matchesBudget;
  });

  // Sort logic
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return 0; // Already sorted by newest in mock data
      case 'highest':
        return b.budget - a.budget;
      case 'lowest':
        return a.budget - b.budget;
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setBudgetRange({ min: '', max: '' });
    setSearchQuery('');
  };

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedLocation !== 'all' ? 1 : 0) +
    (budgetRange.min || budgetRange.max ? 1 : 0);

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-300 mb-2">Explore Gigs</h1>
          <p className="text-gray-400">Browse and find the perfect opportunity</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search gigs by title, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle & Sort */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-100 border border-dark-50 rounded-lg text-gray-400 hover:border-gold-300 hover:text-gold-300 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-gold-300 text-dark-200 px-2 py-0.5 rounded-full text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <label className="text-gray-400 text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Budget</option>
              <option value="lowest">Lowest Budget</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-dark-100 border border-dark-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gold-300">Filters</h3>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-300 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 text-gray-300 hover:text-gold-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.toLowerCase()}
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="accent-gold-300"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-3">Location</label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <label
                      key={location}
                      className="flex items-center gap-2 text-gray-300 hover:text-gold-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="location"
                        value={location.toLowerCase()}
                        checked={selectedLocation === location.toLowerCase()}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="accent-gold-300"
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range Filter */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-3">Budget Range (SGD)</label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={budgetRange.min}
                    onChange={(e) => setBudgetRange({ ...budgetRange, min: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gold-300 transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={budgetRange.max}
                    onChange={(e) => setBudgetRange({ ...budgetRange, max: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gold-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400">
            Showing <span className="text-gold-300 font-semibold">{sortedGigs.length}</span> gigs
          </p>
        </div>

        {/* Gigs Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-300 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading gigs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
            <p className="text-gray-400 text-lg">Could not load gigs. Make sure the backend is running.</p>
          </div>
        ) : sortedGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-dark-100 border border-dark-50 rounded-lg">
            <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Gigs Found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
            <Button onClick={handleClearFilters} variant="secondary">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;