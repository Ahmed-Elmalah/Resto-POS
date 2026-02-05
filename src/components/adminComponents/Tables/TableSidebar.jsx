import React from 'react';

export default function TableSidebar({ activeTable, onClose }) {
  const item = activeTable?.attributes || activeTable;
  const isOpen = !!activeTable; 
  
  const statusConfig = {
    Available: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Busy: "bg-rose-100 text-rose-700 border-rose-200",
    Reserved: "bg-amber-100 text-amber-700 border-amber-200"
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside className={`
        fixed top-0 right-0 h-full z-[110]
        w-[380px] max-w-[90%] 
        bg-[#0f172a] border-l border-slate-800 shadow-2xl
        flex flex-col
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        
       
        lg:relative lg:translate-x-0 lg:z-20
      `}>
        
        {!activeTable ? (
          <div className="hidden lg:flex flex-col h-full items-center justify-center font-bold text-slate-500 shadow-2xl transition-opacity duration-500 opacity-100">
            Choose Table
          </div>
        ) : (
        
          <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-700">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">Table T-{item.table_number}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusConfig[item.table_status]}`}>
                    {item.table_status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Capacity: {item.capacity} People</p>
              </div>

              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
              >
                <span className="material-symbols-outlined text-slate-400 group-hover:text-white">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Current Order</h4>
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <span className="material-symbols-outlined text-5xl mb-3 text-slate-400">order_approve</span>
                <p className="text-sm font-bold text-slate-400 italic">No active orders</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-[#0b1120] border-t border-slate-800">
              <button className="w-full py-4 bg-[#007aff] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                {item.table_status === 'Available' ? 'Open New Order' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}