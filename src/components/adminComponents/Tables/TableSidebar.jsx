import React from 'react';

export default function TableSidebar({ activeTable }) {
  if (!activeTable) {
    return (
      <aside className="w-[340px] hidden lg:flex flex-col items-center justify-center bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl z-20 font-bold text-slate-400">
       Choose Table
      </aside>
    );
  }

  const item = activeTable.attributes || activeTable;
  
  const statusConfig = {
    Available: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Busy: "bg-rose-100 text-rose-700 border-rose-200",
    Reserved: "bg-amber-100 text-amber-700 border-amber-200"
  };

  return (
    <aside className="w-[340px] hidden lg:flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl z-20">
      <div className="p-6 border-b dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold dark:text-white">Table T-{item.table_number}</h3>
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${statusConfig[item.table_status]}`}>
            {item.table_status}
          </span>
        </div>
        <p className="text-xs text-slate-500">Capacity: {item.capacity} People</p>
      </div>

      <div className="flex-1 p-6">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Order</h4>
         {/* Placeholder for orders */}
         <div className="text-center py-10 text-slate-400 italic text-sm">
            {item.table_status === 'Available' ? 'No active orders' : 'Fetching order details...'}
         </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t dark:border-slate-800">
        <button className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          {item.table_status === 'Available' ? 'Open New Order' : 'Proceed to Checkout'}
        </button>
      </div>
    </aside>
  );
}