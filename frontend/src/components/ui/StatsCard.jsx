const StatsCard = ({ label, value, trend, trendColor }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="text-gray-500 text-sm mb-2">{label}</div>
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
      {trend && (
        <div className={`text-${trendColor}-600 text-xs mt-2`}>{trend}</div>
      )}
    </div>
  );
};

export default StatsCard;
