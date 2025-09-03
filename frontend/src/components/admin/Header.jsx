import React, { useState } from "react";
import { IoPersonCircle, IoSettings, IoLogOut, IoChevronDown } from "react-icons/io5";

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
   
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-end px-6 relative z-50">
      <div className="relative">
        <button
          onClick={toggleProfileDropdown}
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <IoPersonCircle className="text-3xl text-gray-600" />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">Ram</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <IoChevronDown
            className={`text-sm text-gray-400 transition-transform ${
              isProfileDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isProfileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">Ram</p>
              <p className="text-sm text-gray-500">ram@admin.com</p>
            </div>

            <div className="py-1">
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <IoPersonCircle className="text-lg" />
                Profile Settings
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <IoSettings className="text-lg" />
                Account Settings
              </button>
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <IoLogOut className="text-lg" />
                Sign Out
              </button>
            </div>
          </div>
          
        )}
      </div>

      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
