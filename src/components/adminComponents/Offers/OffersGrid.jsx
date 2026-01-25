import React from 'react';

const offers = [
  { id: 1, title: "Friday Family Bundle", desc: "Get 4 Burgers, 4 Fries and 4 Drinks for a special price.", price: "$29.99", expiry: "Oct 24, 2023", status: "Active", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80" },
  { id: 2, title: "Lunch Special: 20% Off", desc: "Available Mon-Fri from 11am to 2pm on all large pizzas.", price: "20% OFF", expiry: "Nov 15, 2023", status: "Active", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
  // ... يمكنك إضافة باقي الداتا هنا
];

export default function OffersGrid({ onOpenModal }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <div key={offer.id} className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-[#2a3b4c] overflow-hidden group hover:shadow-lg transition-all">
          <div className="relative h-48 w-full">
            <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${offer.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-600'}`}>
                {offer.status}
              </span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-bold dark:text-white">{offer.title}</h3>
            <p className="text-sm text-[#617589] line-clamp-2">{offer.desc}</p>
            <div className="flex justify-between items-center pt-3 border-t dark:border-gray-700">
              <span className="text-xl font-black text-primary">{offer.price}</span>
              <div className="text-right text-[11px] text-[#617589]">
                <p>Expires</p>
                <p className="font-bold dark:text-gray-300">{offer.expiry}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Placeholder for adding new offer */}
      <button onClick={onOpenModal} className="border-2 border-dashed border-[#e5e7eb] dark:border-[#2a3b4c] rounded-xl flex flex-col items-center justify-center p-8 gap-4 hover:border-primary hover:bg-primary/5 transition-all group min-h-[350px]">
        <div className="size-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">add</span>
        </div>
        <div className="text-center">
          <h3 className="font-bold dark:text-white">Create New Offer</h3>
          <p className="text-sm text-[#617589]">Add a new promotion</p>
        </div>
      </button>
    </div>
  );
}