import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, login as mockLogin, logout as mockLogout } from '../utils/mockAuth';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: getCurrentUser(),
      isAuthenticated: !!getCurrentUser(),
      
      login: (email, password) => {
        const result = mockLogin(email, password);
        if (result.success) {
          set({ user: result.user, isAuthenticated: true });
        }
        return result;
      },
      
      logout: () => {
        mockLogout();
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);