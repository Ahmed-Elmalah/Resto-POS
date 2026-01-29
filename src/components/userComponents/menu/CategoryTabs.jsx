import React from "react";

// We receive the categories list and the function to change the active tab as props
export default function CategoryTabs({ categories  = [], activeCategory, onSelectCategory }) {
  
  // Create a tabs array that includes "All" + categories from API
  // Note: We use 'id: "all"' for the first tab
  const tabs = [{ id: "all", name: "All" }, ...categories];

  return (
    <div className="mb-8 sticky top-18.25 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:dark:bg-transparent">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        
        {tabs.map((cat) => {
          // Check if this tab is currently active
          // If the tab is "All", we match the string "All", otherwise we match the category name
          const isSelected = activeCategory === (cat.name === "All" ? "All" : cat.name);

          return (
            <button
              key={cat.id || cat.name}
              // When clicked, we call the parent function with the category name
              onClick={() => onSelectCategory(cat.name === "All" ? "All" : cat.name)}
              className={`
                flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all duration-200 active:scale-95
                ${
                  isSelected
                    ? "bg-primary text-white shadow-sm" // Active Style
                    : "bg-white dark:bg-[#3a2520] text-[#181211] dark:text-[#e0dcdb] border border-[#e5e1e0] dark:border-[#523832] hover:bg-[#f4f1f0] dark:hover:bg-[#4a2e28]" // Inactive Style
                }
              `}
            >
              <span className={`text-sm ${isSelected ? "font-semibold" : "font-medium"}`}>
                {cat.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}