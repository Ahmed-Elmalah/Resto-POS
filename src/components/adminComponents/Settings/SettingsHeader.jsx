import React from 'react';

export default function SettingsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-[#111418] dark:text-white tracking-tight">Settings</h2>
        <p className="text-[#617589] dark:text-gray-400 mt-1 text-base">
          Manage your restaurant profile and global configurations
        </p>
      </div>
      <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition-all active:scale-95 shrink-0">
        <span className="material-symbols-outlined text-[20px]">save</span>
        <span>Save Changes</span>
      </button>
    </div>
  );
}