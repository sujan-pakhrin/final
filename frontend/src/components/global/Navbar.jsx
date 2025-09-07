import React, { useState, useRef, useEffect, use, useContext } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
const {user} =useContext(AuthContext)
console.log("User in Navbar:", user);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);

 

  const userMenuItems = [
    { name: "My Profile", to: "/profile" },
    { name: "My Orders", to: "/orders" },
    { name: "Sign Out", to: "/logout", divider: true },
  ];

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const handleSearch = (e) => {};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
           <Link to="/" className="text-2xl font-black text-blue-600">
              Logo
          </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8 ml-12">
           <Link
              to="/deals"
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
            >
              Products
          </Link>
           
          </div>
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Search for products, brands and more..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg transition-all duration-300 hover:border-gray-300"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-violet-500 transition-colors duration-300" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => toggleDropdown(true)}
                className="w-12 h-12 bg-blue-500 font-bold text-white rounded-[50%] flex items-center justify-center"
              >
                { user?.username?.charAt(0).toUpperCase() || "NO"}

              </button>

              {activeDropdown  && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-2">
                    {userMenuItems.map((item, index) => (
                      <div key={index}>
                        {item.divider && (
                          <div className="border-t border-gray-100 my-2" />
                        )}
                       <Link
                          to={item.to}
                          className="block px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all duration-300 font-medium"
                        >
                          {item.name}
                      </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white transition-all duration-300"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
           <Link
              to="/deals"
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-300"
            >
              Hot Deals
          </Link>
           <Link
              to="/new"
              className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-300"
            >
              New Arrivals
          </Link>
           <Link
              to="/brands"
              className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all duration-300"
            >
              Brands
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
