import React from "react";
// Icons for UI
import { MdSearch, MdSort } from "react-icons/md";

// Components
import CategoryTabs from "../../components/userComponents/menu/CategoryTabs";
import ProductCard from "../../components/userComponents/menu/ProductCard";
import FloatingCart from "../../components/userComponents/menu/FloatingCart";

// The Hook that contains all logic (Fetch, Search, Filter, Sort)
import useMenuFilter from "../../customHook/useMenuFilter";

export default function UserMenuPage() {
  
  // 1. Destructure data and control functions from our custom hook
  const { 
    products,       // The final list of products (filtered & sorted)
    categories,     // List of categories from API
    activeCategory, // Current selected category
    setActiveCategory, // Function to change category
    searchQuery,    // Current search text
    setSearchQuery, // Function to update search text
    setSortOrder,   // Function to update sort order
    isLoading,      // Loading state
    error           // Error state
  } = useMenuFilter();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col relative text-[#181211] dark:text-[#f4f1f0]">
      
      {/* --- Main Content --- */}
      <main className="flex-1 w-full max-w-300 mt-15 mx-auto px-4 md:px-8 py-6 pb-24">
        
        {/* 2. Category Tabs (Dynamic) */}
        {/* We pass the data and the handler to the child component */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />

        {/* 3. Controls Section (Search & Sort) */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Header & Count */}
          <h2 className="text-2xl font-bold text-[#181211] dark:text-white">
            Resto Menu <span className="text-sm font-normal text-gray-500">({products.length} items)</span>
          </h2>
          
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input 
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                // Update search query instantly on change
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-[#3a2520] border border-[#e5e1e0] dark:border-[#523832] rounded-full text-sm outline-none focus:border-primary transition-colors w-full md:w-64"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <MdSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <select 
                // Update sort order on selection change
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 bg-white dark:bg-[#3a2520] border border-[#e5e1e0] dark:border-[#523832] rounded-full text-sm outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. State Handling (Loading / Error / Empty) */}
        {isLoading && (
          <div className="text-center py-20 text-gray-500">Loading delicious food... 🍔</div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        )}

        {/* 5. Product Grid */}
        {!isLoading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              // Empty State (if search/filter yields no results)
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No items found matching your selection 😔</p>
                <button 
                  onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

      </main>

      {/* Floating Cart (Static for now) */}
      <FloatingCart />
      
    </div>
  );
}