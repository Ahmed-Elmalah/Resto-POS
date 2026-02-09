import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OffersHeader({ onOpenModal }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
    
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
          onClick={()=> navigate('/admin/promotions/new')}
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Create Offer</span>
        </button>
      </div>
    </div>
  );
}