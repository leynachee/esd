import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  icon: Icon,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-400 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <input
          type={inputType}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-10' : 'pr-4'} py-3 bg-dark-100 border ${
            error ? 'border-red-500' : 'border-dark-50'
          } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300 focus:ring-opacity-20 transition-all`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;