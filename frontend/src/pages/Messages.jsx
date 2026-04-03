import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Search,
  Users,
  MoreVertical,
  ArrowLeft,
  Paperclip,
  Smile,
  UserPlus,
  X,
  Check,
  Plus,
  MessageCircle
} from 'lucide-react';
import { getConversations } from '../constants/mockData';

const STORAGE_KEY = 'freelancehub_conversations';

// Available users that can be messaged
const availableUsers = [
  { id: 'user-101', name: 'Sarah M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM', role: 'client' },
  { id: 'user-103', name: 'Maya Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya', role: 'freelancer' },
  { id: 'user-104', name: 'Alex Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'client' },
  { id: 'user-105', name: 'Lisa Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', role: 'freelancer' },
  { id: 'user-106', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', role: 'freelancer' },
  { id: 'user-107', name: 'TechCorp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp', role: 'client' },
  { id: 'user-108', name: 'Rachel Green', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel', role: 'client' },
  { id: 'user-109', name: 'David Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', role: 'freelancer' },
  { id: 'user-110', name: 'Emma Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', role: 'freelancer' },
  { id: 'user-111', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', role: 'freelancer' },
  { id: 'user-112', name: 'Sophia Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia', role: 'client' },
  { id: 'user-113', name: 'Oliver Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver', role: 'freelancer' },
  { id: 'user-114', name: 'Isabella Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella', role: 'client' }
];

const Messages = () => {
  // Load conversations from localStorage or use defaults
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getConversations();
  });

  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatType, setNewChatType] = useState('1-on-1'); // '1-on-1' or 'group'
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const messagesEndRef = useRef(null);

  const currentUserId = 'user-current';

  // Save to localStorage whenever conversations change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }, [selectedConvId, conversations]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConvId) return;

    const timestamp = new Date().toISOString();
    const messageId = `msg-${Date.now()}`;

    const message = {
      id: messageId,
      sender: currentUserId,
      text: newMessage.trim(),
      timestamp: timestamp,
      read: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConvId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: {
            text: newMessage.trim(),
            sender: currentUserId,
            timestamp: timestamp
          }
        };
      }
      return conv;
    }));

    setNewMessage('');
  };

  const handleConversationSelect = (convId) => {
    setSelectedConvId(convId);
    setShowMobileChat(true);
    
    setConversations(prev => prev.map(conv => 
      conv.id === convId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  const resetData = () => {
    if (confirm('Reset all messages to default? This will delete all your messages.')) {
      localStorage.removeItem(STORAGE_KEY);
      setConversations(getConversations());
      alert('Messages reset to default!');
    }
  };

  const handleAddMember = (userId) => {
    const userToAdd = availableUsers.find(u => u.id === userId);
    if (!userToAdd) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConvId && conv.type === 'group') {
        if (conv.participants.some(p => p.id === userId)) {
          alert(`${userToAdd.name} is already in this group!`);
          return conv;
        }

        const updatedParticipants = [...conv.participants, userToAdd];
        
        const systemMessage = {
          id: `msg-${Date.now()}`,
          sender: 'system',
          text: `${userToAdd.name} was added to the group`,
          timestamp: new Date().toISOString(),
          read: true,
          isSystem: true
        };

        return {
          ...conv,
          participants: updatedParticipants,
          messages: [...conv.messages, systemMessage]
        };
      }
      return conv;
    }));

    alert(`✅ ${userToAdd.name} added to the group!`);
  };

  const handleRemoveMember = (userId) => {
    const conv = selectedConv;
    if (!conv || conv.type !== 'group') return;

    const userToRemove = conv.participants.find(p => p.id === userId);
    if (!userToRemove) return;

    if (userId === currentUserId) {
      alert("You can't remove yourself from the group!");
      return;
    }

    if (conv.participants.length <= 3) {
      alert("Group must have at least 3 members!");
      return;
    }

    if (!confirm(`Remove ${userToRemove.name} from this group?`)) return;

    setConversations(prev => prev.map(c => {
      if (c.id === selectedConvId) {
        const updatedParticipants = c.participants.filter(p => p.id !== userId);
        
        const systemMessage = {
          id: `msg-${Date.now()}`,
          sender: 'system',
          text: `${userToRemove.name} was removed from the group`,
          timestamp: new Date().toISOString(),
          read: true,
          isSystem: true
        };

        return {
          ...c,
          participants: updatedParticipants,
          messages: [...c.messages, systemMessage]
        };
      }
      return c;
    }));

    alert(`✅ ${userToRemove.name} removed from group`);
  };

  const handleStartNewChat = (userId) => {
    // Check if conversation already exists
    const existingConv = conversations.find(conv => 
      conv.type === '1-on-1' && 
      conv.participants.some(p => p.id === userId)
    );

    if (existingConv) {
      // Open existing conversation
      setSelectedConvId(existingConv.id);
      setShowNewChatModal(false);
      setShowMobileChat(true);
      return;
    }

    // Create new conversation
    const otherUser = availableUsers.find(u => u.id === userId);
    if (!otherUser) return;

    const currentUser = {
      id: currentUserId,
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      role: 'freelancer'
    };

    const newConv = {
      id: `conv-new-${Date.now()}`,
      type: '1-on-1',
      title: otherUser.name,
      participants: [otherUser, currentUser],
      relatedContract: null,
      lastMessage: {
        text: 'Start chatting!',
        sender: 'system',
        timestamp: new Date().toISOString()
      },
      unreadCount: 0,
      messages: []
    };

    setConversations(prev => [newConv, ...prev]);
    setSelectedConvId(newConv.id);
    setShowNewChatModal(false);
    setShowMobileChat(true);
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert('Please enter a group name!');
      return;
    }

    if (selectedUsers.length < 2) {
      alert('Please select at least 2 members!');
      return;
    }

    const currentUser = {
      id: currentUserId,
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      role: 'freelancer'
    };

    const groupMembers = selectedUsers.map(userId => 
      availableUsers.find(u => u.id === userId)
    ).filter(Boolean);

    const newGroup = {
      id: `conv-group-${Date.now()}`,
      type: 'group',
      title: groupName.trim(),
      participants: [currentUser, ...groupMembers],
      relatedContract: null,
      lastMessage: {
        text: 'Group created',
        sender: 'system',
        timestamp: new Date().toISOString()
      },
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'system',
          text: `${currentUser.name} created the group`,
          timestamp: new Date().toISOString(),
          read: true,
          isSystem: true
        }
      ]
    };

    setConversations(prev => [newGroup, ...prev]);
    setSelectedConvId(newGroup.id);
    setShowNewChatModal(false);
    setSelectedUsers([]);
    setGroupName('');
    setShowMobileChat(true);
    alert(`✅ Group "${groupName}" created!`);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectedConv = conversations.find(c => c.id === selectedConvId);

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Users not in current group (for adding members)
  const usersNotInGroup = selectedConv?.type === 'group' 
    ? availableUsers.filter(user => 
        !selectedConv.participants.some(p => p.id === user.id) && 
        user.id !== currentUserId
      )
    : [];

  // Users for new chat (exclude those with existing 1-on-1 convs)
  const usersForNewChat = availableUsers.filter(user => {
    if (user.id === currentUserId) return false;
    
    // For 1-on-1, exclude if conversation exists
    if (newChatType === '1-on-1') {
      return !conversations.some(conv => 
        conv.type === '1-on-1' && 
        conv.participants.some(p => p.id === user.id)
      );
    }
    
    // For group, show everyone
    return true;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getOtherParticipant = (conv) => {
    if (conv.type === 'group') return null;
    return conv.participants.find(p => p.id !== currentUserId);
  };

  return (
    <div className="h-screen bg-dark-200 flex flex-col">
      {/* Header */}
      <div className="bg-dark-100 border-b border-dark-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-100">Messages</h1>
          
          <button
            onClick={resetData}
            className="px-3 py-1 text-xs text-gray-400 hover:text-gray-300 border border-dark-50 rounded-lg hover:border-gray-400 transition-colors"
            title="Reset messages to default"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className={`
          ${showMobileChat ? 'hidden md:flex' : 'flex'} 
          w-full md:w-80 lg:w-96 flex-col bg-dark-100 border-r border-dark-50
        `}>
          {/* Search */}
          <div className="p-4 border-b border-dark-50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
              />
            </div>
            
            {/* New Chat Button */}
            <button
              onClick={() => {
                setNewChatType('1-on-1');
                setSelectedUsers([]);
                setGroupName('');
                setShowNewChatModal(true);
              }}
              className="w-full px-4 py-2 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const otherParticipant = getOtherParticipant(conv);
                const isSelected = selectedConvId === conv.id;

                return (
                  <div
                    key={conv.id}
                    onClick={() => handleConversationSelect(conv.id)}
                    className={`
                      p-4 border-b border-dark-50 cursor-pointer transition-all
                      ${isSelected ? 'bg-dark-200 border-l-4 border-l-gold-300' : 'hover:bg-dark-200'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        {conv.type === 'group' ? (
                          <div className="w-12 h-12 rounded-full bg-gold-300/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-gold-300" />
                          </div>
                        ) : (
                          <img
                            src={otherParticipant?.avatar}
                            alt={otherParticipant?.name}
                            className="w-12 h-12 rounded-full bg-dark-50"
                          />
                        )}
                        {conv.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`font-semibold truncate ${conv.unreadCount > 0 ? 'text-gray-100' : 'text-gray-300'}`}>
                            {conv.title}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 shrink-0">
                            {formatTimestamp(conv.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        {conv.type === 'group' && (
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {conv.participants.length} members
                            </span>
                          </div>
                        )}

                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>
                          {conv.lastMessage.sender === currentUserId ? 'You: ' : ''}
                          {conv.lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConv ? (
          <div className={`
            ${showMobileChat ? 'flex' : 'hidden md:flex'}
            flex-1 flex-col bg-dark-200
          `}>
            {/* Chat Header */}
            <div className="bg-dark-100 border-b border-dark-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="md:hidden text-gray-400 hover:text-gray-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {selectedConv.type === 'group' ? (
                  <div className="w-10 h-10 rounded-full bg-gold-300/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold-300" />
                  </div>
                ) : (
                  <img
                    src={getOtherParticipant(selectedConv)?.avatar}
                    alt={getOtherParticipant(selectedConv)?.name}
                    className="w-10 h-10 rounded-full bg-dark-50"
                  />
                )}

                <div>
                  <h2 className="font-semibold text-gray-100">{selectedConv.title}</h2>
                  {selectedConv.type === 'group' ? (
                    <p className="text-xs text-gray-500">
                      {selectedConv.participants.map(p => p.name).join(', ')}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {getOtherParticipant(selectedConv)?.role === 'client' ? 'Client' : 'Freelancer'}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedConv.type === 'group' && (
                  <button
                    onClick={() => setShowGroupModal(true)}
                    className="p-2 text-gray-400 hover:text-gold-300 hover:bg-dark-200 rounded-lg transition-colors"
                    title="Manage group members"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                )}
                
                <button className="text-gray-400 hover:text-gray-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConv.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                selectedConv.messages.map((message) => {
                  if (message.isSystem) {
                    return (
                      <div key={message.id} className="flex justify-center">
                        <div className="px-4 py-2 bg-dark-100 rounded-full text-xs text-gray-500 border border-dark-50">
                          {message.text}
                        </div>
                      </div>
                    );
                  }

                  const isCurrentUser = message.sender === currentUserId;
                  const sender = selectedConv.participants.find(p => p.id === message.sender);

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        {!isCurrentUser && selectedConv.type === 'group' && (
                          <img
                            src={sender?.avatar}
                            alt={sender?.name}
                            className="w-8 h-8 rounded-full bg-dark-50 shrink-0"
                          />
                        )}

                        <div>
                          {!isCurrentUser && selectedConv.type === 'group' && (
                            <p className="text-xs text-gray-500 mb-1 ml-2">{sender?.name}</p>
                          )}
                          <div className={`
                            rounded-2xl px-4 py-2
                            ${isCurrentUser 
                              ? 'bg-gold-300 text-dark-200' 
                              : 'bg-dark-100 text-gray-200 border border-dark-50'
                            }
                          `}>
                            <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.text}</p>
                            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-dark-200/70' : 'text-gray-500'}`}>
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-dark-100 border-t border-dark-50 p-4">
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gold-300 transition-colors mb-2"
                  title="Attachments (coming soon)"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 pr-10 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50 resize-none"
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-2 text-gray-400 hover:text-gold-300 transition-colors"
                    title="Emoji (coming soon)"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line • Messages saved locally in your browser
              </p>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-dark-200">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-lg border border-dark-50 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-dark-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-100">New Chat</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Type Tabs */}
            <div className="flex border-b border-dark-50">
              <button
                onClick={() => {
                  setNewChatType('1-on-1');
                  setSelectedUsers([]);
                }}
                className={`flex-1 px-4 py-3 font-medium transition-colors ${
                  newChatType === '1-on-1'
                    ? 'text-gold-300 border-b-2 border-gold-300'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                1-on-1 Chat
              </button>
              <button
                onClick={() => {
                  setNewChatType('group');
                  setSelectedUsers([]);
                }}
                className={`flex-1 px-4 py-3 font-medium transition-colors ${
                  newChatType === 'group'
                    ? 'text-gold-300 border-b-2 border-gold-300'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Group Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {newChatType === 'group' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name..."
                    className="w-full px-4 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
                  />
                </div>
              )}

              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                {newChatType === '1-on-1' ? 'Select Person' : `Select Members (${selectedUsers.length})`}
              </h4>

              {usersForNewChat.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  {newChatType === '1-on-1' 
                    ? 'No new users available. You have conversations with everyone!'
                    : 'No users available'}
                </p>
              ) : (
                <div className="space-y-2">
                  {usersForNewChat.map(user => (
                    <div
                      key={user.id}
                      onClick={() => {
                        if (newChatType === '1-on-1') {
                          handleStartNewChat(user.id);
                        } else {
                          toggleUserSelection(user.id);
                        }
                      }}
                      className={`
                        flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                        ${newChatType === 'group' && selectedUsers.includes(user.id)
                          ? 'bg-gold-300/20 border border-gold-300/50'
                          : 'bg-dark-200 hover:bg-dark-200/80'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-dark-50"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-200">{user.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                      {newChatType === 'group' && selectedUsers.includes(user.id) && (
                        <Check className="w-5 h-5 text-gold-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {newChatType === 'group' && (
              <div className="p-6 border-t border-dark-50">
                <button
                  onClick={handleCreateGroup}
                  disabled={!groupName.trim() || selectedUsers.length < 2}
                  className="w-full px-4 py-3 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Group ({selectedUsers.length + 1} members)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Group Management Modal */}
      {showGroupModal && selectedConv?.type === 'group' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-lg border border-dark-50 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-dark-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-100">Manage Group</h3>
              <button
                onClick={() => setShowGroupModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">
                  Current Members ({selectedConv.participants.length})
                </h4>
                <div className="space-y-2">
                  {selectedConv.participants.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-dark-50"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-200">
                            {user.name}
                            {user.id === currentUserId && ' (You)'}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                      {user.id !== currentUserId && (
                        <button
                          onClick={() => handleRemoveMember(user.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">
                  Add Members
                </h4>
                {usersNotInGroup.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No more users available to add
                  </p>
                ) : (
                  <div className="space-y-2">
                    {usersNotInGroup.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg hover:bg-dark-200/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full bg-dark-50"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-200">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddMember(user.id)}
                          className="px-3 py-1 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-dark-50">
              <button
                onClick={() => setShowGroupModal(false)}
                className="w-full px-4 py-3 bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-200/80 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;