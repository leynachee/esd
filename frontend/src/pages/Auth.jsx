import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Eye, EyeOff, Phone, CreditCard } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { login, register } from '../utils/mockAuth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client', // client or freelancer
    phone: '',
    bankAccount: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      const result = login(loginData.email, loginData.password);

      if (result.success) {
        navigate('/dashboard');
        window.location.reload(); // Refresh to update auth state
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const result = await register(signupData);

    if (result.success) {
      navigate('/dashboard');
      window.location.reload();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (role) => {
    const email = role === 'client' ? 'client@test.com' : 'freelancer@test.com';
    const password = 'password123';
    
    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
        window.location.reload();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-300 mb-2">
            {isLogin ? 'Welcome Back' : 'Join FreelanceHub'}
          </h1>
          <p className="text-gray-400">
            {isLogin 
              ? 'Login to access your account' 
              : 'Create an account to get started'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="bg-dark-100 rounded-lg p-1 mb-6 flex">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              isLogin 
                ? 'bg-gold-300 text-dark-200' 
                : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              !isLogin 
                ? 'bg-gold-300 text-dark-200' 
                : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-dark-100 border border-dark-50 rounded-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                  setError('');
                }}
                required
              />
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-300 h-5 w-5 pointer-events-none z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setError('');
                    }}
                    className="w-full pl-10 pr-12 py-3 bg-dark-100 border border-dark-50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-gold-300 hover:text-gold-200">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-200"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={User}
                value={signupData.name}
                onChange={(e) => {
                  setSignupData({ ...signupData, name: e.target.value });
                  setError('');
                }}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                value={signupData.email}
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                  setError('');
                }}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={signupData.password}
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                  setError('');
                }}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={signupData.confirmPassword}
                onChange={(e) => {
                  setSignupData({ ...signupData, confirmPassword: e.target.value });
                  setError('');
                }}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+65 9123 4567"
                icon={Phone}
                value={signupData.phone}
                onChange={(e) => {
                  setSignupData({ ...signupData, phone: e.target.value });
                  setError('');
                }}
              />
              <Input
                label="Bank Account Number"
                type="text"
                placeholder="e.g. 123-456-789"
                icon={CreditCard}
                value={signupData.bankAccount}
                onChange={(e) => {
                  setSignupData({ ...signupData, bankAccount: e.target.value });
                  setError('');
                }}
              />

              <div className="bg-dark-200 border border-dark-50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-3">I want to:</p>
                <div className="space-y-2">
                  <label 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      signupData.role === 'client' 
                        ? 'bg-gold-300/10 border border-gold-300' 
                        : 'border border-dark-50 hover:border-dark-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="role"
                      checked={signupData.role === 'client'}
                      onChange={() => setSignupData({ ...signupData, role: 'client' })}
                      className="mr-3" 
                    />
                    <Briefcase className={`h-4 w-4 mr-2 ${
                      signupData.role === 'client' ? 'text-gold-300' : 'text-gray-400'
                    }`} />
                    <span className={signupData.role === 'client' ? 'text-gold-300 font-medium' : 'text-gray-300'}>
                      Hire freelancers (Client)
                    </span>
                  </label>
                  <label 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      signupData.role === 'freelancer' 
                        ? 'bg-gold-300/10 border border-gold-300' 
                        : 'border border-dark-50 hover:border-dark-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="role"
                      checked={signupData.role === 'freelancer'}
                      onChange={() => setSignupData({ ...signupData, role: 'freelancer' })}
                      className="mr-3" 
                    />
                    <User className={`h-4 w-4 mr-2 ${
                      signupData.role === 'freelancer' ? 'text-gold-300' : 'text-gray-400'
                    }`} />
                    <span className={signupData.role === 'freelancer' ? 'text-gold-300 font-medium' : 'text-gray-300'}>
                      Work on gigs (Freelancer)
                    </span>
                  </label>
                </div>
              </div>

              <p className="text-gray-400 text-xs">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-gold-300 hover:text-gold-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-gold-300 hover:text-gold-200">
                  Privacy Policy
                </Link>
              </p>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-200"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          )}

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-dark-50">
            <p className="text-gray-400 text-sm text-center mb-3">Demo Accounts (for testing)</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleDemoLogin('client')}
                disabled={isLoading}
                className="px-3 py-2 bg-dark-200 border border-dark-50 rounded text-xs text-gray-400 hover:border-gold-300 hover:text-gold-300 transition-colors disabled:opacity-50"
              >
                Client Demo
              </button>
              <button 
                onClick={() => handleDemoLogin('freelancer')}
                disabled={isLoading}
                className="px-3 py-2 bg-dark-200 border border-dark-50 rounded text-xs text-gray-400 hover:border-gold-300 hover:text-gold-300 transition-colors disabled:opacity-50"
              >
                Freelancer Demo
              </button>
            </div>
            <p className="text-gray-500 text-xs text-center mt-2">
              Email: client@test.com / freelancer@test.com | Password: password123
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;