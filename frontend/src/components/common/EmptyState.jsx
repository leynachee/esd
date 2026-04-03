const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;