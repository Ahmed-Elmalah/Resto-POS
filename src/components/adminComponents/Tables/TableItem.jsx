import React from 'react';

export default function TableItem({ id, status, seats, type, showDelete, onDelete, onClick, isSelected }) {
  // Config for status-based styling
  const statusConfig = {
    occupied: "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]",
    free: "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700",
    reserved: "border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-700",
  };

  return (
    <div className="relative">
      {/* Delete Icon - Visible only in Edit Mode */}
      {showDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-2 -right-2 z-50 bg-rose-600 text-white rounded-full size-6 flex items-center justify-center hover:bg-rose-800 transition-all shadow-lg"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}

      {/* Main Table UI */}
      <div 
        onClick={onClick}
        className={`aspect-square cursor-pointer transition-all duration-300 hover:scale-105 border-2 flex flex-col items-center justify-center 
        ${type === 'circle' ? 'rounded-full' : 'rounded-2xl'} 
        ${statusConfig[status]} 
        ${isSelected ? 'ring-4 ring-primary ring-offset-4 dark:ring-offset-slate-950 scale-105' : 'outline-none'}`}
      >
        <span className="font-bold text-lg">{id}</span>
        {seats && <span className="text-[10px] font-bold opacity-60">{seats} Seats</span>}
      </div>
    </div>
  );
}