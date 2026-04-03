import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-4">{message || 'An error occurred'}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-400"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;