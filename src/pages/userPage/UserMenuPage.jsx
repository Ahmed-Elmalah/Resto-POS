import React from "react";
import CategoryTabs from "../../components/userComponents/menu/CategoryTabs";
import ProductCard from "../../components/userComponents/menu/ProductCard";
import FloatingCart from "../../components/userComponents/menu/FloatingCart";

// Data exactly as per your HTML
const menuItems = [
  { id: 1, name: "Spicy Sriracha Burger", price: 12.99, desc: "Beef patty, sriracha mayo, jalapeños, melted cheddar, lettuce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", time: "20-30 min" },
  { id: 2, name: "Classic Pepperoni", price: 15.50, desc: "Tomato sauce, mozzarella cheese, pepperoni slices, oregano.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60" },
  { id: 3, name: "Caesar Salad", price: 9.00, desc: "Romaine lettuce, croutons, parmesan cheese, caesar dressing.", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60", tag: "VEG" },
  { id: 4, name: "Salmon Sushi Set", price: 18.50, desc: "Fresh salmon nigiri and california rolls served with wasabi.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60" },
  { id: 5, name: "Choco Lava Cake", price: 8.50, desc: "Warm chocolate cake with a molten center and vanilla ice cream.", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=60" },
  { id: 6, name: "Berry Blast Smoothie", price: 6.00, desc: "Mixed berries, yogurt, honey, and chia seeds.", image: "https://images.unsplash.com/photo-1623592863821-697206456f3f?auto=format&fit=crop&w=500&q=60" },
  { id: 7, name: "Street Tacos", price: 11.00, desc: "Three soft corn tortillas with carne asada, onions, and cilantro.", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=60" },
  { id: 8, name: "Pasta Pomodoro", price: 13.50, desc: "Spaghetti with fresh tomato sauce, garlic, and basil.", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60" },
];

export default function UserMenuPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col relative text-[#181211] dark:text-[#f4f1f0]">
      

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-300 mt-15 mx-auto px-4 md:px-8 py-6 pb-24">
        
        {/* 2. Category Navigation */}
        <CategoryTabs />

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#181211] dark:text-white">Resto Menu</h2>    
        </div>

        {/* 3. Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 bg-white dark:bg-background-dark text-[#181211] dark:text-white font-semibold rounded-lg shadow-sm border border-[#e5e1e0] dark:border-[#3a2520] hover:bg-[#f4f1f0] dark:hover:bg-[#3a2520] transition-colors">
            Load More Items
          </button>
        </div>

      </main>

      {/* 4. Floating Cart */}
      <FloatingCart />
      
    </div>
  );
}