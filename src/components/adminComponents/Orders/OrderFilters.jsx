import React from 'react';

export default function OrderFilters() {
  // Filter options config
  const options = [
    { label: "Last 30 Days", icon: "calendar_today" },
    { label: "Status: All", icon: "filter_list" },
    { label: "Cashier: All", icon: "person" }
  ];

  return (
    <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-[#283039]">
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#283039] border border-slate-200 dark:border-[#283039] text-sm font-medium text-slate-700 dark:text-white hover:border-primary transition-all">
            <span className="material-symbols-outlined text-lg text-slate-400">{opt.icon}</span>
            {opt.label}
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        ))}
      </div>
      <button className="text-primary text-sm font-bold hover:underline">Clear all</button>
    </div>
  );
}