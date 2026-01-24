import React from 'react';

export default function TableSidebar() {
  return (
    <aside className="w-[340px] hidden lg:flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl z-20">
      {/* Table Status Header */}
      <div className="p-6 border-b dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold dark:text-white">Table T-1</h3>
          <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase border border-rose-200">Occupied</span>
        </div>
        <p className="text-xs text-slate-500">45m elapsed • Waiter: Sarah M.</p>
      </div>

      {/* Order Summary Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Order</h4>
        <OrderItem count="2x" name="Grilled Salmon" price="$42.00" />
        <OrderItem count="1x" name="Caesar Salad" price="$14.50" />
      </div>

      {/* Quick Actions Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t dark:border-slate-800 grid grid-cols-1 gap-3">
        <button className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </aside>
  );
}

const OrderItem = ({ count, name, price }) => (
  <div className="flex justify-between text-sm">
    <div className="flex gap-2">
      <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">{count}</span>
      <span className="dark:text-slate-300">{name}</span>
    </div>
    <span className="font-bold dark:text-white">{price}</span>
  </div>
);