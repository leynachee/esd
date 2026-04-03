import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle,
  FileText,
  DollarSign,
  MessageSquare,
  UserCheck,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  Check,
  CheckCheck
} from 'lucide-react';
import { getNotifications, getUnreadNotificationCount } from '../constants/mockData';

const Notifications = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, application, contract, payment, message
  const [notifications, setNotifications] = useState(getNotifications());
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application_accepted':
      case 'new_application':
        return { icon: UserCheck, color: 'text-green-300', bg: 'bg-green-400/20' };
      case 'work_submitted':
      case 'phase_approved':
        return { icon: CheckCircle, color: 'text-blue-300', bg: 'bg-blue-400/20' };
      case 'auto_approval_warning':
        return { icon: Clock, color: 'text-yellow-300', bg: 'bg-yellow-400/20' };
      case 'payment_released':
      case 'escrow_payment':
        return { icon: DollarSign, color: 'text-green-300', bg: 'bg-green-400/20' };
      case 'contract_signed':
        return { icon: FileText, color: 'text-gold-300', bg: 'bg-gold-300/20' };
      case 'revision_requested':
        return { icon: XCircle, color: 'text-orange-300', bg: 'bg-orange-400/20' };
      case 'message_received':
        return { icon: MessageSquare, color: 'text-purple-300', bg: 'bg-purple-400/20' };
      default:
        return { icon: Bell, color: 'text-gray-300', bg: 'bg-gray-400/20' };
    }
  };

  const filterNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'application') {
      return notifications.filter(n => 
        n.type.includes('application') || n.type === 'new_application'
      );
    }
    if (filter === 'contract') {
      return notifications.filter(n => 
        n.type.includes('phase') || n.type.includes('contract') || 
        n.type.includes('work') || n.type.includes('revision') ||
        n.type.includes('approval')
      );
    }
    if (filter === 'payment') {
      return notifications.filter(n => n.type.includes('payment'));
    }
    if (filter === 'message') {
      return notifications.filter(n => n.type.includes('message'));
    }
    return notifications;
  };

  const markAsRead = (notifId) => {
    setNotifications(notifications.map(n => 
      n.id === notifId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredNotifications = filterNotifications();

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Notifications</h1>
              <p className="text-gray-400">
                {unreadCount > 0 ? (
                  <span>
                    <span className="text-gold-300 font-medium">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
                  </span>
                ) : (
                  'All caught up!'
                )}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-dark-100 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 hover:bg-dark-100 transition-all"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All', icon: Bell },
              { key: 'application', label: 'Applications', icon: UserCheck },
              { key: 'contract', label: 'Contracts', icon: FileText },
              { key: 'payment', label: 'Payments', icon: DollarSign },
              { key: 'message', label: 'Messages', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              const count = tab.key === 'all' 
                ? notifications.length 
                : filterNotifications().length;
              
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === tab.key
                      ? 'bg-gold-300 text-dark-200'
                      : 'bg-dark-100 text-gray-400 hover:text-gray-300 border border-dark-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {filter === tab.key && tab.key === 'all' && count > 0 && (
                    <span className="px-2 py-0.5 bg-dark-200 text-gold-300 rounded-full text-xs">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-dark-100 rounded-lg border border-dark-50 p-12 text-center">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You're all caught up!" 
                  : `No ${filter} notifications yet.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const { icon: Icon, color, bg } = getNotificationIcon(notification.type);
              
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`bg-dark-100 rounded-lg border transition-all cursor-pointer ${
                    notification.read
                      ? 'border-dark-50 hover:border-dark-50/50'
                      : 'border-gold-300/30 hover:border-gold-300/50'
                  }`}
                >
                  <div className="p-4 flex gap-4">
                    {/* Icon */}
                    <div className={`shrink-0 w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-gray-100'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">
                        {notification.message}
                      </p>

                      {/* User Avatar & Name */}
                      {notification.relatedUser && (
                        <div className="flex items-center gap-2">
                          <img
                            src={notification.relatedUser.avatar}
                            alt={notification.relatedUser.name}
                            className="w-6 h-6 rounded-full bg-dark-50"
                          />
                          <span className="text-sm text-gray-500">
                            {notification.relatedUser.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold-300"></div>
                      </div>
                    )}
                  </div>

                  {/* Action Footer (optional) */}
                  {!notification.read && (
                    <div className="px-4 pb-4 flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="text-xs text-gray-500 hover:text-gold-300 flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Show More (if needed in future) */}
        {filteredNotifications.length > 10 && (
          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-dark-100 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 transition-all">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;