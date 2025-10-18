const MobileNavigation = ({ menuItems, activeSection, onSectionChange }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div
        className="flex overflow-x-auto scrollbar-hide"
        style={{ scrollBarWidth: "none" }}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex-1 min-w-[80px] flex flex-col items-center gap-1 px-3 py-3 transition-colors ${
              activeSection === item.id ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
            <span className="text-xs font-medium truncate w-full text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
