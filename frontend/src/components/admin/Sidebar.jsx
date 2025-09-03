import React, { useState } from "react";
import {
  MdDashboard,
  MdPerson,
  MdLogout,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {
  FaShoppingCart,
  FaBorderAll,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      path: "/admin/dashboard",
      badge: null,
    },
    {
      id: "products",
      label: "Products",
      icon: <FaShoppingCart className="text-xl" />,
      path: null,
      hasSubmenu: true,
      submenu: [
        { label: "All Products", path: "/admin/product" },
        { label: "Add Product", path: "/admin/product/add" },
      ],
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FaBorderAll className="text-xl" />,
      path: "/admin/order",
      badge: "12",
    },
    {
      id: "customers",
      label: "Customers",
      icon: <FaUsers className="text-xl" />,
      path: "/admin/customer",
      badge: null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FaChartBar className="text-xl" />,
      path: "/admin/analytic",
      badge: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog className="text-xl" />,
      path: "/admin/setting",
      badge: null,
    },
  ];

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (submenu) => {
    return submenu?.some((item) => location.pathname === item.path);
  };

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <MdDashboard className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={toggleProductMenu}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      isParentActive(item.submenu)
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          isParentActive(item.submenu)
                            ? "text-blue-700"
                            : "text-gray-500"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {isProductMenuOpen ? (
                        <MdKeyboardArrowDown className="text-gray-400" />
                      ) : (
                        <MdKeyboardArrowRight className="text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isProductMenuOpen && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                              isActive(subItem.path)
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        isActive(item.path) ? "text-blue-700" : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
       
        
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
        >
          <MdLogout className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
