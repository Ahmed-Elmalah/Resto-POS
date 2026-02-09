import React, { useState } from 'react';
import OffersHeader from '../../components/adminComponents/Offers/OffersHeader';
import OffersStats from '../../components/adminComponents/Offers/OffersStates';
import OffersGrid from '../../components/adminComponents/Offers/OffersGrid';

export default function OffersPage() {

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto w-full p-6 md:p-8 space-y-8">
        
        {/* 1. Header with Breadcrumbs & Add Button */}
        <OffersHeader />

        {/* 2. Statistics Summary */}
        <OffersStats />

        {/* 3. Offers Cards Grid */}
        <OffersGrid />

      </div>

    </div>
  );
}