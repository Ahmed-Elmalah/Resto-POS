import React, { useState } from 'react';
import MenuFilters from '../../sections/adminSections/menu/MenuFilters';
import MenuGrid from '../../sections/adminSections/menu/MenuGrid';

const MOCK_PRODUCTS = [
  { id: 1, name: "Double Cheeseburger", price: 12.0, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
  { id: 2, name: "Margherita Pizza", price: 14.5, category: "Pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" },
  { id: 3, name: "Spicy Wings", price: 9.0, category: "Sides", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" },
  { id: 4, name: "Cola", price: 3.0, category: "Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
  { id: 5, name: "Cheesecake", price: 6.5, category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeTab === 'All Items' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    // التغيير هنا:
    // 1. overflow-y-auto: السكرول بقى في الصفحة كلها
    // 2. h-full: عشان تاخد الطول المتاح من الـ Layout
    <div className="flex flex-col h-full w-full bg-background-soft dark:bg-background-dark overflow-y-auto no-scrollbar">
      
      {/* Header Section */}
      {/* شلنا position: sticky/fixed عشان يتحرك مع السكرول */}
      <div className="bg-white/80 dark:bg-[#1a2632]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <MenuFilters 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Grid Section */}
      {/* شلنا overflow-y-auto من هنا عشان السكرول بقى فوق خلاص */}
      <div className="p-4 md:p-6 w-full">
        <MenuGrid products={filteredProducts} />
      </div>
    </div>
  );
}