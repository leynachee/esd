const Button = ({ children, variant = 'primary', type = 'button', className = '', ...props }) => {
  const variants = {
    primary: 'bg-gold-300 text-dark-200 hover:bg-gold-200',
    secondary: 'bg-dark-100 text-gray-400 border border-dark-50 hover:border-gold-300 hover:text-gold-300',
    ghost: 'bg-transparent text-gray-400 hover:text-gold-300',
  };

  return (
    <button
      type={type}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;