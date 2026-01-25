import React from 'react';

export default function StaffTableContainer() {
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
      {/* Tabs - التعديل: التمرير أفقي لو التابس كتير على الموبايل */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
        <button className="pb-3 pt-4 border-b-2 border-primary text-primary font-bold text-sm whitespace-nowrap">Staff Members</button>
        <button className="pb-3 pt-4 text-[#617589] font-bold text-sm hover:text-[#111418] dark:hover:text-white whitespace-nowrap">Pending Invites</button>
      </div>

      {/* Toolbar - التعديل: ترتيب رأسي في الموبايل (flex-col) وأفقي في التابلت (md:flex-row) */}
      <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] text-xl">search</span>
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none text-sm focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        {/* أزرار الفلترة - التعديل: عرض كامل العرض في الموبايل */}
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none justify-center px-4 py-2 rounded-lg border dark:border-gray-700 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
             <span className="material-symbols-outlined text-lg">filter_list</span> 
             <span>Filter</span>
           </button>
           <button className="flex-1 md:flex-none justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors">
             Export
           </button>
        </div>
      </div>

      {/* Table Section - التعديل: إضافة overflow-x-auto لضمان عدم خروج الجدول عن الشاشة */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-[#f9fafb] dark:bg-gray-800/50 text-[#617589] text-xs uppercase font-semibold">
            <tr>
              <th className="py-4 px-6">Employee</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
             <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <td className="py-4 px-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                      <div className="truncate">
                         <p className="text-sm font-bold dark:text-white truncate">Sarah Johnson</p>
                         <p className="text-xs text-[#617589] truncate">sarah@bistro.com</p>
                      </div>
                   </div>
                </td>
                <td className="py-4 px-6">
                   <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold">Administrator</span>
                </td>
                <td className="py-4 px-6">
                   <div className="flex items-center gap-1.5 text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      <span className="text-sm font-medium">Active</span>
                   </div>
                </td>
                <td className="py-4 px-6 text-right">
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                   </button>
                </td>
             </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}