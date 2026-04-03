const StatusBadge = ({ status }) => {
  const styles = {
    reviewing: 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-400',
    in_progress: 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-400',
    completed: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400',
    pending: 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-400',
    rejected: 'bg-red-500 bg-opacity-20 text-red-300 border border-red-400',
  };

  const labels = {
    reviewing: 'Reviewing',
    in_progress: 'In Progress',
    completed: 'Completed',
    pending: 'Pending',
    rejected: 'Rejected',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;