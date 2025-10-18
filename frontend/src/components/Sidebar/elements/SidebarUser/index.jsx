import { Building2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from "@/context/authContext";

const SidebarUser = ({ isOpen, isUser }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isCommunity = localStorage.getItem("id");

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
            {isCommunity ? (
              <Link
                href={isUser ? "/lc/company" : "/lc"}
                className="flex items-center"
              >
                {isUser ? <Building2 /> : <User />}
              </Link>
            ) : (
              <button className="cursor-pointer" onClick={() => setOpen(true)}>
                <Building2 />
              </button>
            )}

            <button className="cursor-pointer" onClick={logout}>
              <LogOut />
            </button>
          </div>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Создайте компанию
              </h2>
              <button
                className="text-gray-400 hover:text-gray-700 self-end transition"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <RegisterForm isCompany={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarUser;
