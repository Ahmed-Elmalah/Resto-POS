import React from 'react';
import useAdminStore from '../../../store/useAdminStore'; // Import Store

export default function OffersStats() {
  // Get offers from store
  const { offers } = useAdminStore();

  // --- Calculate Stats Logic ---
  
  // 1. Total Offers
  const totalOffers = offers.length;

  // 2. Active Offers (Available AND Not Expired)
  const activeOffers = offers.filter(offer => {
    const isAvailable = offer.isAvailable; // or offer.attributes.isAvailable depending on structure
    const isNotExpired = new Date(offer.expiryDate) >= new Date();
    return isAvailable && isNotExpired;
  }).length;

  // 3. Expiring Soon (Expires within 7 days)
  const expiringSoon = offers.filter(offer => {
    const expiry = new Date(offer.expiryDate);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return expiry > today && expiry <= nextWeek;
  }).length;

  // Prepare Data Array
  const stats = [
    { 
      label: "Total Offers", // Changed from "Active" to Total for clarity
      value: totalOffers, 
      icon: "inventory_2", 
      color: "text-primary", 
      bg: "bg-blue-50 dark:bg-blue-900/20" 
    },
    { 
      label: "Active Now", 
      value: activeOffers, 
      icon: "check_circle", 
      color: "text-green-600", 
      bg: "bg-green-50 dark:bg-green-900/20" 
    },
    { 
      label: "Expiring Soon", 
      value: expiringSoon, 
      icon: "hourglass_top", 
      color: "text-orange-600", 
      bg: "bg-orange-50 dark:bg-orange-900/20" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3b4c] flex items-center gap-4">
          <div className={`p-3 ${stat.bg} rounded-lg ${stat.color}`}>
            <span className="material-symbols-outlined">{stat.icon}</span>
          </div>
          <div>
            <p className="text-xs text-[#617589] dark:text-[#9ca3af] font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-[#111418] dark:text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}