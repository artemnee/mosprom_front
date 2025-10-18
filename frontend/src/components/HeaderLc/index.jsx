const HeaderLc = ({ onToggleSidebar, activeSection, menuItems, pathname }) => {
  return (
    <header className="h-10 bg-white m-1 rounded-xl bg-white/80 z-30 flex items-center px-4 lg:px-6 ">
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
    </header>
  );
};

export default HeaderLc;
