// src/utils/mockAuth.js
// Auth system: login/password managed locally; user creation via OutSystems.

import { createOutSystemsUser } from '../services/userService';

const STORAGE_KEY = 'freelancehub_auth';
const USERS_KEY = 'freelancehub_users';

// Hardcoded demo accounts (IDs 15 & 16 exist in OutSystems)
export const mockUsers = [
    {
        id: 15,
        email: 'client@test.com',
        password: 'password123',
        name: 'John Doe',
        role: 'client',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        phone: '+65 9123 4567',
        location: 'Singapore',
        memberSince: '2023-01-15',
        verified: true,
    },
    {
        id: 16,
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
];

// --- Persisted user storage (survives page refresh) ---
const getPersistedUsers = () => {
    try {
        const saved = localStorage.getItem(USERS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch { return []; }
};

const persistUser = (user) => {
    const users = getPersistedUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Find user by predicate — checks hardcoded then persisted
const findUser = (predicate) =>
    mockUsers.find(predicate) || getPersistedUsers().find(predicate);

// Get current logged-in user from localStorage
export const getCurrentUser = () => {
    const authData = localStorage.getItem(STORAGE_KEY);
    if (!authData) return null;

    try {
        const { userId, expiresAt } = JSON.parse(authData);

        if (new Date().getTime() > expiresAt) {
            logout();
            return null;
        }

        const user = findUser(u => u.id === userId);
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

// Login with email and password
export const login = (email, password) => {
    const user = findUser(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        return { success: false, error: 'Invalid email or password' };
    }

    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: user.id, expiresAt }));

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
};

// Register new user — creates user in OutSystems to get a real numeric UserId
export const register = async (userData) => {
    // Check email not already taken
    const existing = findUser(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
        return { success: false, error: 'Email already registered' };
    }

    // Create in OutSystems
    let osResult;
    try {
        osResult = await createOutSystemsUser({
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            bankAccount: userData.bankAccount || '',
            qualifications: userData.role === 'freelancer'
                ? (Array.isArray(userData.skills) ? userData.skills.join(', ') : (userData.skills || ''))
                : '',
        });
    } catch (err) {
        return { success: false, error: 'Could not connect to user service. Try again.' };
    }

    if (!osResult.Success) {
        return { success: false, error: osResult.Message || 'Failed to create account' };
    }

    const newUser = {
        id: osResult.UserId, // Numeric ID from OutSystems
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role || 'client',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        phone: userData.phone || '',
        location: 'Singapore',
        memberSince: new Date().toISOString(),
        verified: false,
    };

    if (newUser.role === 'freelancer') {
        newUser.title = userData.title || '';
        newUser.rating = 0;
        newUser.completedGigs = 0;
        newUser.hourlyRate = userData.hourlyRate || 0;
        newUser.skills = userData.skills || [];
        newUser.bio = userData.bio || '';
    }

    persistUser(newUser);

    // Auto-login
    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: newUser.id, expiresAt }));

    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
};

// Logout
export const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/';
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

    // Check hardcoded users first
    const hardcodedIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (hardcodedIndex !== -1) {
        mockUsers[hardcodedIndex] = { ...mockUsers[hardcodedIndex], ...updates };
        const { password: _, ...userWithoutPassword } = mockUsers[hardcodedIndex];
        return { success: true, user: userWithoutPassword };
    }

    // Update in persisted storage
    const users = getPersistedUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx === -1) return { success: false, error: 'User not found' };

    users[idx] = { ...users[idx], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = users[idx];
    return { success: true, user: userWithoutPassword };
};

// Get all users (for demo purposes)
export const getAllUsers = () => {
    const all = [...mockUsers, ...getPersistedUsers()];
    return all.map(({ password, ...user }) => user);
};

// Switch user (for testing different roles)
export const switchUser = (userId) => {
    const user = findUser(u => u.id === userId);
    if (!user) {
        return { success: false, error: 'User not found' };
    }

    const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: user.id, expiresAt }));

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
};
