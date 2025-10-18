const HeaderLc = ({ onToggleSidebar, activeSection, menuItems }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6">
      <button
        onClick={onToggleSidebar}
        className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-900">
          {menuItems.find((item) => item.id === activeSection)?.label}
        </h1>
      </div>

      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
        Создать
      </button>
    </header>
  );
};

export default HeaderLc;
