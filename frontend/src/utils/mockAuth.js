// src/utils/mockAuth.js
// Simple mock authentication system for frontend development
// Replace with real backend authentication later

const STORAGE_KEY = 'freelancehub_auth';

// Mock users database
export const mockUsers = [
    {
        id: 'user-1',
        email: 'client@test.com',
        password: 'password123', // In production: never store plain passwords!
        name: 'John Doe',
        role: 'client', // client or freelancer
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        phone: '+65 9123 4567',
        location: 'Singapore',
        memberSince: '2023-01-15',
        verified: true,
    },
    {
        id: 'user-2',
        email: 'freelancer@test.com',
        password: 'password123',
        name: 'Alex Chen',
        role: 'freelancer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        title: 'Full Stack Developer',
        rating: 4.9,
        completedGigs: 127,
        hourlyRate: 85,
        skills: ['React', 'Node.js', 'Python', 'MongoDB'],
        phone: '+65 8234 5678',
        location: 'Singapore',
        memberSince: '2022-06-20',
        verified: true,
        bio: 'Experienced full-stack developer specializing in modern web applications.',
    },
    {
        id: 'user-3',
        email: 'sarah@test.com',
        password: 'password123',
        name: 'Sarah M.',
        role: 'client',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
        phone: '+65 9876 5432',
        location: 'Singapore',
        memberSince: '2023-03-10',
        verified: true,
    },
    {
        id: 'user-4',
        email: 'maya@test.com',
        password: 'password123',
        name: 'Maya Patel',
        role: 'freelancer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        title: 'UI/UX Designer',
        rating: 5.0,
        completedGigs: 98,
        hourlyRate: 75,
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        phone: '+65 8765 4321',
        location: 'Singapore',
        memberSince: '2022-09-05',
        verified: true,
        bio: 'Award-winning UI/UX designer passionate about creating delightful user experiences.',
    },
];

// Get current logged-in user from localStorage
export const getCurrentUser = () => {
    const authData = localStorage.getItem(STORAGE_KEY);
    if (!authData) return null;

    try {
        const { userId, expiresAt } = JSON.parse(authData);

        // Check if session expired
        if (new Date().getTime() > expiresAt) {
            logout();
            return null;
        }

        // Find user by ID
        const user = mockUsers.find(u => u.id === userId);
        if (!user) return null;

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

// Login with email and password
export const login = (email, password) => {
    const user = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        return { success: false, error: 'Invalid email or password' };
    }

    // Create session (expires in 7 days)
    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    const authData = {
        userId: user.id,
        expiresAt,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
};

// Register new user
export const register = (userData) => {
    // Check if email already exists
    const existingUser = mockUsers.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
        return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        password: userData.password, // In production: hash this!
        name: userData.name,
        role: userData.role || 'client',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        phone: userData.phone || '',
        location: userData.location || 'Singapore',
        memberSince: new Date().toISOString(),
        verified: false,
    };

    // Add role-specific fields
    if (newUser.role === 'freelancer') {
        newUser.title = userData.title || '';
        newUser.rating = 0;
        newUser.completedGigs = 0;
        newUser.hourlyRate = userData.hourlyRate || 0;
        newUser.skills = userData.skills || [];
        newUser.bio = userData.bio || '';
    }

    // Add to mock database
    mockUsers.push(newUser);

    // Auto-login after registration
    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    const authData = {
        userId: newUser.id,
        expiresAt,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
};

// Logout
export const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/'; // Redirect to home
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

// Check if user has specific role
export const hasRole = (role) => {
    const user = getCurrentUser();
    return user?.role === role;
};

// Update user profile
export const updateProfile = (updates) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, error: 'Not authenticated' };
    }

    // Find user in mock database
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
        return { success: false, error: 'User not found' };
    }

    // Update user data
    mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
    };

    // Return updated user without password
    const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
    return { success: true, user: userWithoutPassword };
};

// Change password
export const changePassword = (currentPassword, newPassword) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, error: 'Not authenticated' };
    }

    // Find user in mock database
    const user = mockUsers.find(u => u.id === currentUser.id);
    if (!user) {
        return { success: false, error: 'User not found' };
    }

    // Verify current password
    if (user.password !== currentPassword) {
        return { success: false, error: 'Current password is incorrect' };
    }

    // Update password
    user.password = newPassword;

    return { success: true };
};

// Get all users (for demo purposes)
export const getAllUsers = () => {
    return mockUsers.map(({ password, ...user }) => user);
};

// Switch user (for testing different roles)
export const switchUser = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        return { success: false, error: 'User not found' };
    }

    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    const authData = {
        userId: user.id,
        expiresAt,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
};