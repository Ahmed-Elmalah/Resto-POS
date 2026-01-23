import React from 'react';

export default function BestSellerCard() {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 h-36 transition-transform hover:scale-[1.02]">
      <div 
        className="w-24 h-full rounded-lg bg-cover bg-center shrink-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
      ></div>
      <div className="flex flex-col justify-center h-full">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Best Seller</p>
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Spicy Tuna Roll</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">45 sold today</p>
        <p className="text-slate-900 dark:text-white font-semibold mt-auto">$12.50</p>
      </div>
    </div>
  );
}