import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Bell, CreditCard, 
  Globe, Shield, Eye, EyeOff, Camera
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    username: 'alexchen',
    bio: 'Full-stack developer with 5+ years of experience building web applications.',
    location: 'Singapore',
    phone: '+65 9123 4567',
    website: 'https://alexchen.dev',
  });

  // Password settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailGigUpdates: true,
    emailMessages: true,
    emailPayments: true,
    emailMarketing: false,
    pushGigUpdates: true,
    pushMessages: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showOnlineStatus: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy({ ...privacy, [key]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changing password');
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    alert('Notification preferences saved!');
  };

  const handleSavePrivacy = () => {
    console.log('Saving privacy:', privacy);
    alert('Privacy settings saved!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-300 mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-dark-100 border border-dark-50 rounded-lg p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold-300 text-dark-200'
                        : 'text-gray-400 hover:bg-dark-50 hover:text-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gold-300 mb-6">Profile Information</h2>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Avatar */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-2xl">
                        AC
                      </div>
                      <Button variant="secondary" type="button" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      icon={User}
                      required
                    />

                    <Input
                      label="Username"
                      name="username"
                      type="text"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    icon={Mail}
                    required
                  />

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Location
                      </label>
                      <select
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                      >
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <Input
                    label="Website"
                    name="website"
                    type="url"
                    value={profileData.website}
                    onChange={handleProfileChange}
                    icon={Globe}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => navigate('/profile')}
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gold-300 mb-6">Change Password</h2>

                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-12 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-100 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-12 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-100 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Input
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    icon={Lock}
                    required
                  />

                  <div className="bg-dark-200 border border-dark-50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Password requirements:</p>
                    <ul className="space-y-1 text-gray-400 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-gold-300">•</span>
                        <span>At least 8 characters long</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold-300">•</span>
                        <span>Contains uppercase and lowercase letters</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold-300">•</span>
                        <span>Contains at least one number</span>
                      </li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full">
                    Update Password
                  </Button>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gold-300 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailGigUpdates', label: 'Gig updates and applications' },
                        { key: 'emailMessages', label: 'New messages' },
                        { key: 'emailPayments', label: 'Payment updates' },
                        { key: 'emailMarketing', label: 'Marketing and promotions' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-dark-200 rounded-lg cursor-pointer hover:bg-dark-50 transition-colors">
                          <span className="text-gray-300">{item.label}</span>
                          <button
                            type="button"
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-gold-300' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'pushGigUpdates', label: 'Gig updates and applications' },
                        { key: 'pushMessages', label: 'New messages' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-dark-200 rounded-lg cursor-pointer hover:bg-dark-50 transition-colors">
                          <span className="text-gray-300">{item.label}</span>
                          <button
                            type="button"
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-gold-300' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="w-full">
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-dark-100 border border-dark-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gold-300 mb-6">Privacy Settings</h2>

                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-100 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                    >
                      <option value="public">Public - Anyone can view</option>
                      <option value="members">Members Only - Logged-in users only</option>
                      <option value="private">Private - Hidden from search</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Show Contact Information</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'showEmail', label: 'Show email address on profile' },
                        { key: 'showPhone', label: 'Show phone number on profile' },
                        { key: 'showOnlineStatus', label: 'Show online status' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-dark-200 rounded-lg cursor-pointer hover:bg-dark-50 transition-colors">
                          <span className="text-gray-300">{item.label}</span>
                          <button
                            type="button"
                            onClick={() => handlePrivacyChange(item.key, !privacy[item.key])}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              privacy[item.key] ? 'bg-gold-300' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                privacy[item.key] ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSavePrivacy} className="w-full">
                    Save Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;