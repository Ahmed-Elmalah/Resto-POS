import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";

export default function ProductCard({ item }) {
  // Logic to show "Quantity Controls" if item is in cart (Mock logic based on ID 4)
  const isInCart = item.id === 4; 

  return (
    <div className={`group flex flex-col bg-white dark:bg-background-dark rounded-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 
      ${isInCart 
        ? "shadow-[0_0_0_2px_#ec3713] dark:shadow-[0_0_0_2px_#ec3713]" // Active Border Style
        : "shadow-sm hover:shadow-md border border-transparent dark:border-[#3a2520]" // Normal Style
      }`}
    >
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${item.image}')` }}
        ></div>
        
        {/* Badge: Time (like card 1) */}
        {item.time && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#181211] dark:text-white shadow-sm">
            {item.time}
          </div>
        )}

        {/* Badge: Veg (like card 3) */}
        {item.tag && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
            {item.tag}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-[#181211] dark:text-white line-clamp-1">
            {item.name}
          </h3>
        </div>
        <p className="text-sm text-[#896861] dark:text-[#a08078] line-clamp-2 mb-4">
          {item.desc}
        </p>

        {/* Price & Action Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-[#181211] dark:text-white">
            ${item.price.toFixed(2)}
          </span>

          {isInCart ? (
            // Quantity Control (The Sushi Card Logic)
            <div className="flex items-center bg-primary rounded-full h-9">
              <button className="size-9 flex items-center justify-center text-white hover:bg-black/10 rounded-full transition-colors">
                <MdRemove className="text-[18px]" />
              </button>
              <span className="text-white font-bold text-sm w-4 text-center">1</span>
              <button className="size-9 flex items-center justify-center text-white hover:bg-black/10 rounded-full transition-colors">
                <MdAdd className="text-[18px]" />
              </button>
            </div>
          ) : (
            // Normal Add Button
            <button className="flex items-center justify-center size-9 rounded-full bg-[#f4f1f0] dark:bg-[#3a2520] text-primary hover:bg-primary hover:text-white transition-colors">
              <MdAdd className="text-[20px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}