import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MdMenu } from 'react-icons/md'; // أيقونة المنيو
import Sidebar from '../components/adminComponents/Sidebar';

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="theme-admin bg-background-light dark:bg-background-dark min-h-screen flex text-slate-900 dark:text-white font-sans">
      
      {/* السايدبار وبنبعتله الـ state والدالة عشان يقفل نفسه */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeMobileMenu={() => setSidebarOpen(false)} 
      />


      <main className="flex-1 ml-0 md:ml-20 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        

        <div className="md:hidden bg-white dark:bg-[#1a2632] p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                    <MdMenu size={28} />
                </button>
                <span className="font-bold text-lg">RestoAdmin</span>
            </div>
            {/* ممكن تحط صورة البروفايل هنا للموبايل لو حابب */}
        </div>

        <Outlet />
      </main>
    </div>
  );
}