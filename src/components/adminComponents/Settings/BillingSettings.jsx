import React from 'react';

export default function BillingSettings() {
  return (
    <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2A3B4D] overflow-hidden h-fit">
      <div className="px-6 py-4 border-b border-[#e5e7eb] dark:border-[#2A3B4D]">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">payments</span>
          Billing Settings
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Currency</label>
          <select className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] py-2.5 pl-3 pr-10 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>EGP (ج.م)</option>
            <option>SAR (ر.س)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Tax Rate</label>
            <div className="relative">
              <input 
                type="number" 
                className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] py-2.5 pr-8 pl-3 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm text-right" 
                defaultValue="14" 
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617589] text-sm font-medium">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Service Fee</label>
            <div className="relative">
              <input 
                type="number" 
                className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] py-2.5 pr-8 pl-3 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm text-right" 
                defaultValue="10" 
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617589] text-sm font-medium">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}