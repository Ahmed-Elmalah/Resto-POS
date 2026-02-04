import React from 'react';

export default function TableHeader({ isEditMode, onToggleEdit }) {
  const areas = ["Main Hall", "Patio", "Bar Area", "VIP Room"];

  return (
    <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-10">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Table Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time floor monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* المناطق (Areas) */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {areas.map((area, i) => (
              <button 
                key={i} 
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  i === 0 
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {/* زرار الـ Edit Floor اللي بيتحول لـ Cancel Edit */}
          <button 
            onClick={onToggleEdit}
            className={`flex items-center gap-2 h-10 px-4 rounded-lg font-bold shadow-md transition-all duration-300 ${
              isEditMode 
              ? 'bg-rose-600 hover:bg-rose-700 text-white' 
              : 'bg-primary hover:bg-blue-600 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isEditMode ? 'close' : 'edit_square'}
            </span>
            <span>{isEditMode ? 'Cancel Edit' : 'Edit Floor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}