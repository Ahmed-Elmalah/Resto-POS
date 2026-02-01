import ProductCard from "../../components/casherComponents/ProductCard";
import useMenuFilter from "../../customHook/useMenuFilter";
import CasherLayout from "../../layouts/CasherLayout";


export default function CasherHomePage() {
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    isLoading,
    searchQuery,
    setSearchQuery,
    searchInputRef,
    clearSearch,
    error,
  } = useMenuFilter(true);

  return (
    <CasherLayout
      categories={categories}
      activeCategory={activeCategory}
      onSelectCategory={setActiveCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchInputRef={searchInputRef}
      clearSearch={clearSearch}
    >
      {isLoading && <div className="text-center py-10">Loading Menu...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </CasherLayout>
  );
}
