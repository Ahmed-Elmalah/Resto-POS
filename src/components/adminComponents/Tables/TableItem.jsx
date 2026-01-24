import React from 'react';

export default function TableItem({ id, status, seats, time, type }) {
  // Dynamic styles based on status
  const statusConfig = {
    occupied: "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]",
    free: "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700",
    reserved: "border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-700",
    cleaning: "border-slate-300 border-dashed bg-slate-100 dark:bg-slate-800/50 text-slate-500"
  };

  return (
    <div className="group relative aspect-square cursor-pointer transition-transform hover:scale-105">
      <div className={`w-full h-full border-2 flex flex-col items-center justify-center 
        ${type === 'circle' ? 'rounded-full' : 'rounded-xl'} ${statusConfig[status]}`}>
        
        <span className="font-bold text-lg">{id}</span>
        
        {seats && <span className="text-[10px] font-bold opacity-70">{seats} Seats</span>}
        {time && <span className="text-[10px] font-bold">{time}</span>}
        {status === 'cleaning' && <span className="material-symbols-outlined text-sm">cleaning_services</span>}
      </div>
    </div>
  );
}