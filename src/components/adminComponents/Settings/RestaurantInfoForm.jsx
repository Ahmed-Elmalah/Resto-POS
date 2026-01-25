import React from 'react';

export default function RestaurantInfoForm() {
  return (
    <div className="bg-white dark:bg-[#1A2633] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2A3B4D] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e5e7eb] dark:border-[#2A3B4D]">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">storefront</span>
          Restaurant Info
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-200 mb-2">Restaurant Logo</label>
          <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-[#f6f7f8] dark:bg-[#101922]/50 hover:bg-gray-50 dark:hover:bg-[#1f2d3d] transition-colors cursor-pointer group relative">
            <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 bg-white dark:bg-[#1A2633] rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
              </div>
              <p className="mb-1 text-sm dark:text-gray-300"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-[#617589] dark:text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Restaurant Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#617589] text-[20px]">badge</span>
              <input className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] pl-10 py-2.5 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm transition-colors" defaultValue="The Gourmet Kitchen" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium dark:text-gray-200 mb-1.5">Full Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-3 material-symbols-outlined text-[#617589] text-[20px]">location_on</span>
              <textarea className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f6f7f8] dark:bg-[#101922] pl-10 py-2.5 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm transition-colors resize-none" rows="3" defaultValue="123 Culinary Ave, Suite 100, San Francisco, CA 94107" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}