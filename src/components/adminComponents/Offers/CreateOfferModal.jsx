import React from 'react';

export default function CreateOfferModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1a2632] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">Create New Offer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 dark:text-gray-200">Offer Title</label>
            <input type="text" className="w-full px-4 py-2.5 rounded-xl border dark:bg-[#101922] dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Summer Special" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-gray-200">Price / Discount</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-xl border dark:bg-[#101922] dark:border-gray-700 outline-none" placeholder="$0.00" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-gray-200">Expiry Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-xl border dark:bg-[#101922] dark:border-gray-700 outline-none text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 dark:text-gray-200">Description</label>
            <textarea className="w-full px-4 py-2.5 rounded-xl border dark:bg-[#101922] dark:border-gray-700 outline-none" rows="3" placeholder="Describe your offer..."></textarea>
          </div>

          <button type="submit" className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all">
            Save Offer
          </button>
        </form>
      </div>
    </div>
  );
}