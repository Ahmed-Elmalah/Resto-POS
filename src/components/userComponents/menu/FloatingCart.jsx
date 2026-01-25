import React from "react";
import { MdShoppingCart } from "react-icons/md";

export default function FloatingCart() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="flex items-center gap-3 bg-primary hover:bg-red-600 text-white pl-4 pr-6 py-3.5 rounded-full shadow-[0_8px_30px_rgb(236,55,19,0.3)] transition-all hover:scale-105 active:scale-95 group">
        <div className="relative">
          <MdShoppingCart className="text-2xl" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="font-bold text-base">View Cart</span>
          <span className="text-xs opacity-90 font-medium">2 items • $31.49</span>
        </div>
      </button>
    </div>
  );
}