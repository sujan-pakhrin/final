import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiLayout,
  FiShoppingBag,
  FiBarChart2,
  FiX,
} from "react-icons/fi";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <FiLayout />,
  },
  {
    id: "product",
    label: "Product",
    path: "/admin/product",
    icon: <FiShoppingBag />,
  },
  {
    id: "order",
    label: "Order",
    path: "/admin/order",
    icon: <FiCheckCircle />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-base items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"
        >
          <span className="text-xl">{menuItem.icon}</span>
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-background border-r p-6 transition-transform duration-200 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4 border-b pb-4">
          <div
            onClick={() => {
              navigate("/admin/dashboard");
              setOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FiBarChart2 className="text-xl" />
            <h1 className="text-xl font-extrabold">Admin Panel</h1>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-muted"
            aria-label="Close sidebar"
          >
            <FiX className="text-lg" />
          </button>
        </div>
        <MenuItems setOpen={setOpen} />
      </div>
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <FiBarChart2 className="text-2xl" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;
