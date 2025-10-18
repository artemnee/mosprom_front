const EmptyState = ({ icon, label }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={icon}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{label}</h3>
      <p className="text-gray-500">Контент для этого раздела в разработке</p>
    </div>
  );
};

export default EmptyState;
