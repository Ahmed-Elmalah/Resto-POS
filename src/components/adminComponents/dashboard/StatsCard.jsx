import React from 'react';

export default function StatsCard({ title, value, icon, trend, trendValue, color }) {
  // بنحدد ألوان الخلفية والنص بناءً على الـ color prop
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600",
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-36 transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</h3>
        {trend && (
          <p className={`${trend === 'up' ? 'text-green-600' : 'text-red-500'} text-sm font-medium flex items-center gap-1 mt-1`}>
            {trendValue}
          </p>
        )}
      </div>
    </div>
  );
}