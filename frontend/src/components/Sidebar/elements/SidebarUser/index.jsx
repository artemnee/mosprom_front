import { LogOut } from "lucide-react";
import { useAuth } from "@/context/authContext";

const SidebarUser = ({ isOpen }) => {
  const { user, logout } = useAuth();
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
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm font-medium text-gray-900 truncate">
                Админ
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email}
              </div>
            </div>
            <button className="cursor-pointer" onClick={logout}>
              <LogOut />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarUser;
