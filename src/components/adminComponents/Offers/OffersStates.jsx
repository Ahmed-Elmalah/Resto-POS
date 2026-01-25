import React from 'react';

const stats = [
  { label: "Active Offers", value: "8", icon: "local_offer", color: "text-primary", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Redeemed Today", value: "142", icon: "check_circle", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
  { label: "Expiring Soon", value: "3", icon: "hourglass_top", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
];

export default function OffersStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3b4c] flex items-center gap-4">
          <div className={`p-3 ${stat.bg} rounded-lg ${stat.color}`}>
            <span className="material-symbols-outlined">{stat.icon}</span>
          </div>
          <div>
            <p className="text-xs text-[#617589] dark:text-[#9ca3af] font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-[#111418] dark:text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}