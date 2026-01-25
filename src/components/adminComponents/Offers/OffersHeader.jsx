import React from 'react';

export default function OffersHeader({ onOpenModal }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs - للشاشات الكبيرة */}
      <div className="hidden lg:flex items-center gap-2 text-sm text-[#617589] dark:text-[#9ca3af]">
        <a className="hover:text-primary transition-colors cursor-pointer">Dashboard</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <a className="hover:text-primary transition-colors cursor-pointer">Marketing</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#111418] dark:text-white font-medium">Offers</span>
      </div>

      {/* Page Title & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white tracking-tight">
            Offers Management
          </h1>
          <p className="text-[#617589] dark:text-[#9ca3af] mt-1 text-sm">
            Create, manage and track your promotional campaigns.
          </p>
        </div>
        
        <button 
          onClick={onOpenModal}
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Create Offer</span>
        </button>
      </div>
    </div>
  );
}