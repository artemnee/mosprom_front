const ActivityItem = ({ activity }) => {
  return (
    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
        {activity.user[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 text-sm">
          <span className="font-medium">{activity.user}</span>
          <span className="text-gray-600"> {activity.action}</span>
        </p>
        {activity.project && (
          <p className="text-gray-500 text-sm mt-1">{activity.project}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
