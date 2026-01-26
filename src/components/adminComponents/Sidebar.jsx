import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdRestaurantMenu, 
  MdHistory, 
  MdTableRestaurant, 
  MdGroup, 
  MdBarChart, 
  MdLocalOffer, 
  MdSettings, 
  MdLogout,
  MdClose,
  MdPerson2
} from 'react-icons/md';
import ThemeToggle from '../ThemeToggle';

// --- Configuration ---
const LINKS = [
  { path: "/admin", label: "Dashboard", icon: <MdDashboard size={24} />, end: true },
  { path: "/admin/menu", label: "Menu", icon: <MdRestaurantMenu size={24} /> },
  { path: "/admin/orders", label: "Orders", icon: <MdHistory size={24} /> },
  { path: "/admin/tables", label: "Tables", icon: <MdTableRestaurant size={24} /> },
  { path: "/admin/staff", label: "Staff", icon: <MdGroup size={24} /> },
  { path: "/admin/promotions", label: "Offers", icon: <MdLocalOffer size={24} /> },
  { path: "/admin/settings", label: "Settings", icon: <MdSettings size={24} /> },
  { path: "/admin/profile", label: "profile", icon: <MdPerson2 size={24} /> },
];

// --- Sub-Component: Sidebar Link ---
const SidebarLink = ({ path, label, icon, end, onClick }) => (
  <NavLink
    to={path}
    onClick={onClick}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group overflow-hidden whitespace-nowrap
      ${isActive
        ? "bg-primary text-white shadow-md shadow-primary/20"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary"
      }
      md:justify-center lg:justify-start`
    }
  >
    <span className="shrink-0">{icon}</span>
    {/* Label hidden on tablet, visible on mobile/desktop */}
    <span className="text-sm font-medium md:hidden lg:block">{label}</span>
  </NavLink>
);

// --- Main Component ---
export default function Sidebar({ isOpen, closeMobileMenu }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 h-full bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-20 lg:w-64
        `}
      >
        {/* Header: Logo & Mobile Close */}
        <div className="flex items-center justify-between gap-3 px-4 py-6 border-b border-slate-100 dark:border-slate-800 h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
              <MdRestaurantMenu size={24} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white md:hidden lg:block whitespace-nowrap">
              RestoAdmin
            </h1>
          </div>

          <button onClick={closeMobileMenu} className="md:hidden text-slate-500">
            <MdClose size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 no-scrollbar">
          {LINKS.map((link) => (
            <SidebarLink 
              key={link.path} 
              {...link} 
              onClick={closeMobileMenu} 
            />
          ))}
        </nav>

        {/* Footer: User Profile & Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-4">
             {/* Profile Row */}
             <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 md:justify-center lg:justify-between">
                
                {/* User Info (Mobile/Desktop) */}
                <div className="flex items-center gap-3 md:hidden lg:flex min-w-0">
                    <div 
                        className="w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center shrink-0" 
                        style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=32')" }}
                    />
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Ahmed</p>
                    </div>
                </div>

                {/* Avatar Only (Tablet) */}
                <div 
                    className="hidden md:block lg:hidden w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center shrink-0" 
                    style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=32')" }}
                />

                {/* Actions (Mobile/Desktop) */}
                <div className="flex items-center gap-1 md:hidden lg:flex">
                    <div className="scale-75 origin-center"><ThemeToggle /></div>
                    <button className="p-1 text-slate-400 hover:text-red-500"><MdLogout size={18} /></button>
                </div>
             </div>
             
             {/* Actions (Tablet Only - Vertical) */}
             <div className="hidden md:flex lg:hidden flex-col items-center gap-3">
                 <div className="scale-75"><ThemeToggle /></div>
                 <button className="text-slate-400 hover:text-red-500"><MdLogout size={20} /></button>
             </div>

          </div>
        </div>
      </aside>
    </>
  );
}