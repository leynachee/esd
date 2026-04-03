import { useState, useEffect } from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

// Shared bookmark utilities (same as in GigDetails)
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
  
  // Dispatch event for other components
  window.dispatchEvent(new CustomEvent('savedGigsChanged', { 
    detail: { gigId, action: isSaved ? 'unsaved' : 'saved' } 
  }));
  
  return !isSaved;
};

const GigCard = ({ gig }) => {
  const { id, title, description, budget, location, postedAt, category, clientName } = gig;
  
  // Use localStorage instead of prop to get saved state
  const [isSaved, setIsSaved] = useState(() => isGigSaved(id));

  // Listen for bookmark changes from other components
  useEffect(() => {
    const handleSavedGigsChanged = (event) => {
      if (event.detail.gigId === id) {
        setIsSaved(event.detail.action === 'saved');
      }
    };

    window.addEventListener('savedGigsChanged', handleSavedGigsChanged);
    
    return () => {
      window.removeEventListener('savedGigsChanged', handleSavedGigsChanged);
    };
  }, [id]);

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent navigation to gig details
    e.stopPropagation(); // Stop event from bubbling
    
    const newState = toggleSaveGig(id);
    setIsSaved(newState);
  };

  return (
    <Link
      to={`/gigs/${id}`}
      className="block bg-dark-100 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-dark-50 text-gray-300 text-xs font-medium rounded mb-2">
            {category}
          </span>
          <h3 className="text-xl font-semibold text-gray-100 group-hover:text-gold-300 transition-colors">
            {title}
          </h3>
        </div>
        <button 
          onClick={handleBookmarkClick}
          className="text-gray-400 hover:text-gold-300 transition-colors relative group/bookmark"
          title={isSaved ? "Remove from saved" : "Save gig"}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-gold-300 text-gold-300' : ''}`} />
          {/* Tooltip */}
          <span className="absolute -bottom-8 right-0 px-2 py-1 bg-dark-50 text-gray-300 text-xs rounded opacity-0 group-hover/bookmark:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            {isSaved ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{postedAt}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-50">
        <div>
          <span className="text-gold-300 font-bold text-lg">SGD {budget.toLocaleString()}</span>
          <p className="text-gray-500 text-xs mt-0.5">Posted by {clientName}</p>
        </div>
        <span className="text-gray-400 text-sm group-hover:text-gold-300 transition-colors">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default GigCard;