const SidebarMenu = ({ items, activeSection, onSectionChange, isOpen }) => {
  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto">
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5  cursor-pointer rounded-lg transition-colors ${
              activeSection === item.id
                ? ""
                : "text-gray-700 bg-white hover:bg-blue-200/50"
            }`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SidebarMenu;
