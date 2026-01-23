import React from 'react';
import AdminProductCard from '../../../components/adminComponents/menu/AdminProductCard';

export default function MenuGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
        <p className="text-lg font-medium">No items found matching your search.</p>
      </div>
    );
  }

  return (
    // Grid: Mobile (1), Tablet (2), Desktop/Large (4)
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <AdminProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}