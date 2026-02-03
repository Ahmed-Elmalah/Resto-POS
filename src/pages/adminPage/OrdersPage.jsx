import React from "react";
import OrderFilters from "../../components/adminComponents/Orders/OrderFilters";
import OrderTable from "../../components/adminComponents/Orders/OrderTable";

export default function OrdersPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Orders History
          </h1>
          <p className="text-slate-500 dark:text-[#9dabb9] text-sm md:text-base font-medium">
            View and manage past transactions.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900 dark:bg-[#283039] text-white hover:bg-[#FF4500] transition-all active:scale-95 shadow-md w-full md:w-auto">
          <span className="material-symbols-outlined text-xl">download</span>
          <span className="text-sm font-bold">Export CSV</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#1c2127]/50 rounded-[24px] border border-slate-200 dark:border-[#283039] shadow-xl shadow-black/5">
        <div className="p-3 md:p-5 lg:p-6">
          <OrderFilters />

          <div className="mt-6 overflow-x-auto">
            <OrderTable />
          </div>
        </div>
      </div>

      <div className="h-20 md:hidden" />
    </div>
  );
}
