import React from 'react';
import SettingsHeader from '../../components/adminComponents/Settings/SettingsHeader';
import RestaurantInfoForm from '../../components/adminComponents/Settings/RestaurantInfoForm';
import WorkingHours from '../../components/adminComponents/Settings/WorkingHours';
import BillingSettings from '../../components/adminComponents/Settings/BillingSettings';

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto h-full bg-[#f6f7f8] dark:bg-[#101922] transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10 flex flex-col gap-8 pb-20">
        
        <SettingsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <RestaurantInfoForm />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <BillingSettings />
            <WorkingHours />
          </div>
        </div>
        
      </div>
    </div>
  );
}