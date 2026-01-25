import React, { useState } from 'react';
import OffersHeader from '../../components/adminComponents/Offers/OffersHeader';
import OffersStats from '../../components/adminComponents/Offers/OffersStates';
import OffersGrid from '../../components/adminComponents/Offers/OffersGrid';
import CreateOfferModal from '../../components/adminComponents/Offers/CreateOfferModal';

export default function OffersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto w-full p-6 md:p-8 space-y-8">
        
        {/* 1. Header with Breadcrumbs & Add Button */}
        <OffersHeader onOpenModal={() => setIsModalOpen(true)} />

        {/* 2. Statistics Summary */}
        <OffersStats />

        {/* 3. Offers Cards Grid */}
        <OffersGrid onOpenModal={() => setIsModalOpen(true)} />

      </div>

      {/* 4. Create/Edit Modal */}
      {isModalOpen && <CreateOfferModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}