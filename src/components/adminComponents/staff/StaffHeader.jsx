import React from 'react';

export default function StaffHeader() {
  return (
    <div className="px-6 py-6 md:px-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-[#617589] mb-4">
        <span className="hover:text-primary cursor-pointer">Dashboard</span>
        <span>/</span>
        <span className="text-[#111418] dark:text-white font-medium">Staff & Roles</span>
      </div>

      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight">Staff & Roles</h1>
          <p className="text-[#617589] text-base">Manage access, permissions, and shifts for your team.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary hover:bg-blue-600 text-white font-bold shadow-md transition-all active:scale-95">
          <span className="material-symbols-outlined">add</span>
          <span>Invite New Staff</span>
        </button>
      </div>
    </div>
  );
}