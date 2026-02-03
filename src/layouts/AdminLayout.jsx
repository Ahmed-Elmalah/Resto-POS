import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Sidebar from "../components/adminComponents/Sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="theme-admin no-scrollbar bg-background-light dark:bg-background-dark w-full flex text-slate-900 dark:text-white font-sans ">
      <Sidebar
        isOpen={isSidebarOpen}
        closeMobileMenu={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full w-full md:ml-20 lg:ml-64 transition-all duration-300 relative">
        <div className="md:hidden flex-none bg-white dark:bg-[#1a2632] p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <MdMenu size={28} />
            </button>
            <span className="font-bold text-lg">RestoAdmin</span>
          </div>
        </div>

        <div className="flex-1 no-scrollbar min-h-screen w-full relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
