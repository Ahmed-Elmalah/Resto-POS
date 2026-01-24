import React from 'react';
import OrderTable from '../../components/adminComponents/orders/OrderTable';
import OrderFilters from '../../components/adminComponents/orders/OrderFilters';

export default function OrdersPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header Section with Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Orders History</h1>
          <p className="text-slate-500 dark:text-[#9dabb9]">View and manage past transactions.</p>
        </div>
        <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-slate-900 dark:bg-[#283039] text-white hover:opacity-90 transition-all">
          <span className="material-symbols-outlined text-sm">download</span>
          <span className="text-sm font-bold">Export CSV</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-slate-50 dark:bg-[#1c2127]/50 rounded-2xl border border-slate-200 dark:border-[#283039] overflow-hidden shadow-sm">
        <OrderFilters />
        <OrderTable />
      </div>
    </div>
  );
}