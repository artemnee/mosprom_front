const SidebarUser = ({ isOpen }) => {
  return (
    <div className="p-3 border-t border-gray-200">
      <div
        className={`flex items-center gap-3 px-3 py-2 ${
          isOpen ? "" : "justify-center"
        }`}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          А
        </div>
        {isOpen && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              Админ
            </div>
            <div className="text-xs text-gray-500 truncate">
              admin@micron.ru
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarUser;
