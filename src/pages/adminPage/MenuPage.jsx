import MenuFilters from '../../sections/adminSections/menu/MenuFilters';
import MenuGrid from '../../sections/adminSections/menu/MenuGrid';
import useMenuFilter from '../../customHook/useMenuFilter';

export default function MenuPage() {
  const { 
    products, 
    categories, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    sortOrder, 
    setSortOrder,
    isLoading,
    error 
  } = useMenuFilter();

  return (
    <div className="flex flex-col h-full w-full bg-background-soft dark:bg-background-dark overflow-y-auto no-scrollbar">
      
      {/* Header Section */}
      <div className="bg-white/80 dark:bg-[#1a2632]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <MenuFilters 
          categories={categories} 
          activeTab={activeCategory} 
          setActiveTab={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortOrder}
          setSortBy={setSortOrder}
        />
      </div>

      {/* Grid Section */}
      <div className="p-4 md:p-6 w-full">
        {isLoading && <div className="text-center py-10">Loading Products...</div>}
        {error && <div className="text-center py-10 text-red-500">Error: {error}</div>}
        
        {!isLoading && !error && (
            <MenuGrid products={products} />
        )}
      </div>
    </div>
  );
}