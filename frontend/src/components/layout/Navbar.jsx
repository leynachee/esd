import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, Briefcase, HelpCircle, LayoutDashboard, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getUnreadNotificationCount } from '../../constants/mockData';
import { getCurrentUser, logout } from '../../utils/mockAuth';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get current logged-in user
  const currentUser = getCurrentUser();
  const isLoggedIn = currentUser !== null;
  const userName = currentUser?.name || "Guest";

  const unreadCount = getUnreadNotificationCount();

  const handleLogout = () => {
    logout(); // This will redirect to home automatically
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-dark-100 border-b border-dark-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="FreelanceHub"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gold-300">
              FreelanceHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/explore"
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              <span>Explore Gigs</span>
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
            <Link
              to="/how-it-works"
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>How It Works</span>
            </Link>
          </div>

          {/* Right Side - Auth & Notifications */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notification Bell */}
                <Link
                  to="/notifications"
                  className="relative text-gray-400 hover:text-gold-300 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {/* Notification badge - only show if unread > 0 */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gold-300 flex items-center justify-center">
                      <User className="h-5 w-5 text-dark-200" />
                    </div>
                    <span>{userName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-100 border border-dark-50 rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-dark-200 hover:text-gold-300 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-dark-200 hover:text-gold-300 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-dark-50" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-dark-200 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/auth"
                  className="text-gray-400 hover:text-gray-100 transition-colors"
                >
                  Login
                </Link>
                {/* Sign Up Button */}
                <Link
                  to="/auth"
                  className="bg-gold-300 text-dark-200 px-4 py-2 rounded-lg hover:bg-gold-200 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-gold-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-100 border-t border-dark-50">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/explore"
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4" />
              <span>Explore Gigs</span>
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
            <Link
              to="/how-it-works"
              className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4" />
              <span>How It Works</span>
            </Link>

            <div className="border-t border-dark-50 pt-3 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/notifications"
                    className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2 w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 text-gray-400 hover:text-gold-300 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="block text-gray-400 hover:text-gold-300 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    className="block bg-gold-300 text-dark-200 px-4 py-2 rounded-lg hover:bg-gold-200 transition-colors font-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;