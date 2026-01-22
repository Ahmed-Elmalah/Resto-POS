import React, { useEffect, useState } from 'react';

// دي نسخة مدمجة من ThemeToggle عشان نلغي احتمالية غلط المسارات
function ThemeToggleInline() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light');
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark text-primary shadow-sm">
      <span className="material-symbols-outlined text-[22px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-6 w-full">
      <div className="flex items-center gap-4">
        {/* ندينا المكون المدمج هنا */}
        <ThemeToggleInline />
        
        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-border-dark pl-4">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">point_of_sale</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-gray-900 dark:text-white">RestoPOS</h1>
            <p className="text-[10px] text-gray-500 dark:text-text-muted font-bold">Wed, Oct 24 • 12:30 PM</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md relative group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        <input 
          className="w-full p-3 pl-10 text-sm border border-gray-200 dark:border-border-dark rounded-xl bg-white dark:bg-card-dark text-gray-900 dark:text-white outline-none focus:border-primary transition-all shadow-sm" 
          placeholder="Search menu items..." 
          type="text"
        />
      </div>
    </div>
  );
}