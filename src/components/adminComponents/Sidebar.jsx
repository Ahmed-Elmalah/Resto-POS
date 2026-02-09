import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // أضفنا useNavigate
import {
  MdDashboard,
  MdRestaurantMenu,
  MdHistory,
  MdTableRestaurant,
  MdGroup,
  MdLocalOffer,
  MdSettings,
  MdLogout,
  MdClose,
} from "react-icons/md";
import ThemeToggle from "../ThemeToggle";
import useLogin from "../../customHook/useLogin";
import { useAuthuser } from "../../store";

const LINKS = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: <MdDashboard size={24} />,
    end: true,
  },
  { path: "/admin/menu", label: "Menu", icon: <MdRestaurantMenu size={24} /> },
  { path: "/admin/orders", label: "Orders", icon: <MdHistory size={24} /> },
  {
    path: "/admin/tables",
    label: "Tables",
    icon: <MdTableRestaurant size={24} />,
  },
  { path: "/admin/staff", label: "Staff", icon: <MdGroup size={24} /> },
  {
    path: "/admin/promotions",
    label: "Offers",
    icon: <MdLocalOffer size={24} />,
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: <MdSettings size={24} />,
  },
];

const SidebarLink = ({ path, label, icon, end, onClick }) => (
  <NavLink
    to={path}
    onClick={onClick}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group overflow-hidden whitespace-nowrap
      ${
        isActive
          ? "bg-primary text-white shadow-md shadow-primary/20"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary"
      }
      md:justify-center lg:justify-start`
    }
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-sm font-medium md:hidden lg:block">{label}</span>
  </NavLink>
);

export default function Sidebar({ isOpen, closeMobileMenu }) {
  const { user } = useAuthuser();
  const navigate = useNavigate();
  const { logOut } = useLogin();

  const goToProfile = () => {
    navigate("/admin/profile");
    closeMobileMenu();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 h-full bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-20 lg:w-64
        `}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-6 border-b border-slate-100 dark:border-slate-800 h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
              <MdRestaurantMenu size={24} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white md:hidden lg:block whitespace-nowrap">
              RestoAdmin
            </h1>
          </div>

          <button
            onClick={closeMobileMenu}
            className="md:hidden text-slate-500"
          >
            <MdClose size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 no-scrollbar">
          {LINKS.map((link) => (
            <SidebarLink key={link.path} {...link} onClick={closeMobileMenu} />
          ))}
        </nav>

        {/* Footer: User Profile & Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-4">
            {/* Profile Row*/}
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 md:justify-center lg:justify-between group/user transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              {/* User Info (Mobile/Desktop) */}
              <div
                onClick={goToProfile}
                className="flex items-center gap-3 md:hidden lg:flex min-w-0 flex-1"
              >
                <div
                  className="w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center shrink-0 border border-transparent group-hover/user:border-primary transition-all"
                  style={{
                    backgroundImage:
                      "url('https://api.dicebear.com/7.x/avataaars/svg?seed=John')",
                  }}
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover/user:text-primary transition-colors">
                    {user.username}
                  </p>
                </div>
              </div>

              {/* Avatar Only (Tablet) */}
              <div
                onClick={goToProfile}
                className="hidden md:block lg:hidden w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center shrink-0 cursor-pointer border border-transparent hover:border-primary transition-all"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=John')",
                }}
              />

              {/* Actions */}
              <div className="flex items-center gap-1 md:hidden lg:flex">
                <div className="scale-75 origin-center">
                  <ThemeToggle />
                </div>
                <button
                  onClick={logOut}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <MdLogout size={18} />
                </button>
              </div>
            </div>

            {/* Actions (Tablet Only) */}
            <div className="hidden md:flex lg:hidden flex-col items-center gap-3">
              <div className="scale-75">
                <ThemeToggle />
              </div>
              <button
                onClick={logOut}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <MdLogout size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
