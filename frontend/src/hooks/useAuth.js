import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    updateUser,
  };
};