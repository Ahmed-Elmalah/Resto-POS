import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // بنجيب الحالة من localStorage عشان يفضل فاكر المود
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="size-10 rounded-xl flex items-center justify-center transition-all active:scale-90 bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark shadow-sm"
    >
      <span className="material-symbols-outlined text-primary text-[22px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}