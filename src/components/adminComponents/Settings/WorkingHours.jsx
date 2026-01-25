import React from 'react';

export default function WorkingHours() {
  return (
    <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2A3B4D] overflow-hidden h-fit">
      <div className="px-6 py-4 border-b border-[#e5e7eb] dark:border-[#2A3B4D]">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">schedule</span>
          Working Hours
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Opening Time</label>
          <input 
            type="time" 
            className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] py-2.5 px-3 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm [color-scheme:light] dark:[color-scheme:dark]" 
            defaultValue="09:00" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Closing Time</label>
          <input 
            type="time" 
            className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] py-2.5 px-3 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm [color-scheme:light] dark:[color-scheme:dark]" 
            defaultValue="23:00" 
          />
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg mt-2 border border-primary/10">
          <span className="material-symbols-outlined text-primary text-xl">info</span>
          <p className="text-xs text-[#617589] dark:text-gray-400">
            These hours will be visible to customers on the main menu page.
          </p>
        </div>
      </div>
    </div>
  );
}