import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // We'll implement actual search later
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for gigs, skills, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold-300 text-dark-200 px-6 py-2 rounded-lg hover:bg-gold-200 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;