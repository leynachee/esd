import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const Toast = ({ type = 'success', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400',
      iconColor: 'text-green-400',
      textColor: 'text-green-300',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400',
      iconColor: 'text-red-400',
      textColor: 'text-red-300',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400',
      iconColor: 'text-yellow-400',
      textColor: 'text-yellow-300',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400',
      iconColor: 'text-blue-400',
      textColor: 'text-blue-300',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 shadow-lg flex items-start gap-3 min-w-[320px] max-w-md animate-slideIn`}>
      <Icon className={`h-5 w-5 ${iconColor} mt-0.5 shrink-0`} />
      <p className={`${textColor} flex-1 text-sm`}>{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-300 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;