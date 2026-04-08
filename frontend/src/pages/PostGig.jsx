import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Briefcase, Tag, Plus, X } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { usePostJob } from '../hooks/usePostJob';
import { useAuthStore } from '../store/useAuthStore';

// Common skills database for autocomplete
const commonSkills = [
    // Design
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign', 
    'UI Design', 'UX Design', 'Graphic Design', 'Logo Design', 'Branding',
    'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design',
    
    // Development
    'React', 'React Native', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP',
    'Ruby', 'Ruby on Rails', 'Django', 'Flask', 'Express.js',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'SCSS',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
    'Git', 'REST API', 'GraphQL', 'WebSocket', 'CI/CD',
    
    // Writing
    'Content Writing', 'Copywriting', 'SEO Writing', 'Technical Writing',
    'Blog Writing', 'Article Writing', 'Creative Writing', 'Editing',
    'Proofreading', 'Research', 'Email Marketing', 'Social Media Writing',
    
    // Marketing
    'SEO', 'SEM', 'Social Media Marketing', 'Facebook Ads', 'Google Ads',
    'Instagram Marketing', 'TikTok Marketing', 'Content Marketing',
    'Email Marketing', 'Growth Hacking', 'Analytics', 'Google Analytics',
    'Marketing Strategy', 'Brand Strategy', 'Influencer Marketing',
    
    // Video
    'Video Editing', 'Premiere Pro', 'After Effects', 'Final Cut Pro',
    'DaVinci Resolve', 'Motion Graphics', 'Animation', '3D Animation',
    'Color Grading', 'Sound Design', 'Video Production', 'YouTube',
    
    // Photography
    'Photography', 'Wedding Photography', 'Portrait Photography',
    'Product Photography', 'Event Photography', 'Lightroom', 'Photoshop',
    'Photo Editing', 'Photo Retouching', 'Studio Photography',
    
    // Music
    'Music Production', 'Audio Editing', 'Sound Engineering', 'Mixing',
    'Mastering', 'Logic Pro', 'Ableton Live', 'FL Studio', 'Pro Tools',
    
    // Business
    'Business Planning', 'Financial Analysis', 'Excel', 'PowerPoint',
    'Data Analysis', 'Project Management', 'Agile', 'Scrum',
    'Business Strategy', 'Market Research', 'Consulting',
];

const PostGig = () => {
    const navigate = useNavigate();
    const { mutate: submitJob, isPending: isSubmitting, error: submitError } = usePostJob();
    const user = useAuthStore((state) => state.user);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        budget: '',
        timeline: '',
        location: 'Remote',
        experienceLevel: 'intermediate',
    });

    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    
    const skillInputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const categories = [
        'Design',
        'Development',
        'Writing',
        'Marketing',
        'Video',
        'Photography',
        'Music',
        'Business',
    ];

    const experienceLevels = [
        { value: 'entry', label: 'Entry Level', description: 'New to the field' },
        { value: 'intermediate', label: 'Intermediate', description: '1-3 years experience' },
        { value: 'expert', label: 'Expert', description: '3+ years experience' },
    ];

    // Handle skill input change and filter suggestions
    const handleSkillInputChange = (e) => {
        const value = e.target.value;
        setSkillInput(value);

        if (value.trim().length > 0) {
            const filtered = commonSkills.filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase()) &&
                !skills.includes(skill)
            ).slice(0, 8); // Show max 8 suggestions

            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
            setSelectedSuggestionIndex(-1);
        } else {
            setShowSuggestions(false);
            setFilteredSuggestions([]);
        }
    };

    // Handle keyboard navigation in suggestions
    const handleSkillInputKeyDown = (e) => {
        if (!showSuggestions) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedSuggestionIndex(prev =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedSuggestionIndex >= 0) {
                    handleSelectSuggestion(filteredSuggestions[selectedSuggestionIndex]);
                } else {
                    handleAddSkill();
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedSuggestionIndex(-1);
                break;
            default:
                break;
        }
    };

    // Select a suggestion
    const handleSelectSuggestion = (skill) => {
        if (!skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
        setSkillInput('');
        setShowSuggestions(false);
        setFilteredSuggestions([]);
        setSelectedSuggestionIndex(-1);
        skillInputRef.current?.focus();
    };

    // Click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                !skillInputRef.current?.contains(event.target)
            ) {
                setShowSuggestions(false);
                setSelectedSuggestionIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
            setShowSuggestions(false);
            setFilteredSuggestions([]);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            userID: user?.id,
            eventType: formData.category,
            eventWage: parseFloat(formData.budget),
            startDate: new Date().toISOString().split('T')[0],
            dueDate: formData.timeline,
        };

        submitJob(payload, {
            onSuccess: () => {
                alert(`Gig "${formData.category}" posted successfully!`);
                navigate('/dashboard');
            },
            onError: (err) => {
                alert(`Failed to post gig: ${err.response?.data?.error || err.message}`);
            },
        });
    };

    return (
        <div className="min-h-screen bg-dark-200 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gold-300 mb-2">Post a Gig</h1>
                    <p className="text-gray-400">Create a new job posting and find the perfect freelancer</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gold-300 mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            <Input
                                label="Gig Title"
                                name="title"
                                type="text"
                                placeholder="e.g., Wedding Photography Needed"
                                icon={Briefcase}
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder="Describe what you need... Include details about deliverables, requirements, and expectations."
                                    className="w-full px-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Skills Required - WITH AUTOCOMPLETE */}
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gold-300 mb-4">Skills Required</h2>

                        <div className="mb-4 relative">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-300 h-5 w-5 pointer-events-none z-10" />
                                        <input
                                            ref={skillInputRef}
                                            type="text"
                                            placeholder="e.g., React, Photoshop, SEO..."
                                            value={skillInput}
                                            onChange={handleSkillInputChange}
                                            onKeyDown={handleSkillInputKeyDown}
                                            onFocus={() => {
                                                if (skillInput.trim() && filteredSuggestions.length > 0) {
                                                    setShowSuggestions(true);
                                                }
                                            }}
                                            className="w-full pl-10 pr-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                                        />
                                    </div>

                                    {/* Autocomplete Suggestions Dropdown */}
                                    {showSuggestions && filteredSuggestions.length > 0 && (
                                        <div
                                            ref={suggestionsRef}
                                            className="absolute z-50 w-full mt-2 bg-dark-100 border border-dark-50 rounded-lg shadow-xl max-h-64 overflow-y-auto"
                                        >
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => handleSelectSuggestion(suggestion)}
                                                    className={`w-full text-left px-4 py-3 transition-colors ${
                                                        index === selectedSuggestionIndex
                                                            ? 'bg-gold-300 text-dark-200'
                                                            : 'text-gray-300 hover:bg-dark-50'
                                                    }`}
                                                >
                                                    <span className="font-medium">{suggestion}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Button type="button" onClick={handleAddSkill} className="whitespace-nowrap">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                                Type to see suggestions, or press Enter to add custom skill
                            </p>
                        </div>

                        {skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-300 text-sm flex items-center gap-2"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Budget & Timeline */}
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gold-300 mb-4">Budget & Timeline</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Budget (SGD)"
                                name="budget"
                                type="number"
                                placeholder="e.g., 1500"
                                icon={DollarSign}
                                value={formData.budget}
                                onChange={handleInputChange}
                                required
                            />

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Project Deadline
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-300 h-5 w-5 pointer-events-none z-10" />
                                    <input
                                        type="date"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Location
                                </label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                                >
                                    <option value="Remote">Remote</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Indonesia">Indonesia</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Experience Level
                                </label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                                >
                                    {experienceLevels.map((level) => (
                                        <option key={level.value} value={level.value}>
                                            {level.label} - {level.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gold-300 mb-3">Payment Info</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            How payment works on FreelanceHub:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-gold-300 mt-0.5">•</span>
                                <span>Freelancers join your waitlist and you review their profiles</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold-300 mt-0.5">•</span>
                                <span>When you accept a freelancer, payment is triggered immediately via Stripe</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold-300 mt-0.5">•</span>
                                <span>The accepted freelancer is notified and the gig moves to In Progress</span>
                            </li>
                        </ul>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post Gig'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostGig;