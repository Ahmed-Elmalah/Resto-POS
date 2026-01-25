import React from "react";

const categories = ["All", "Popular", "Burgers", "Pizza", "Sushi", "Drinks", "Sides", "Desserts"];

export default function CategoryTabs() {
  return (
    // Sticky Category Bar (Top 73px to account for Header height)
    <div className="mb-8 sticky top-18.25 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:dark:bg-transparent">
      <div className="flex gap-3 overflow-x-auto no-scrollbar  pb-1">
        
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`
              flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all duration-200 active:scale-95
              ${
                index === 0
                  ? "bg-primary text-white shadow-sm" // Active Style (First Item)
                  : "bg-white dark:bg-[#3a2520] text-[#181211] dark:text-[#e0dcdb] border border-[#e5e1e0] dark:border-[#523832] hover:bg-[#f4f1f0] dark:hover:bg-[#4a2e28]" // Inactive Style
              }
            `}
          >
            <span className={`text-sm ${index === 0 ? "font-semibold" : "font-medium"}`}>
              {cat}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
}