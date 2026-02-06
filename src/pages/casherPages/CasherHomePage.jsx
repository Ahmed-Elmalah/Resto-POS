import CasherLayout from "../../layouts/CasherLayout";
import ProductCard from "../../components/casherComponents/ProductCard";
import useMenuFilter from "../../customHook/useMenuFilter"; // استدعاء الهوك
import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../store";

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

  const [viewMode, setViewMode] = useState("menu");
  const [busyTables, setBusyTables] = useState([]);
  const fetchBusyTables = async () => {
    try {
      const res = await axios.get(
        `${domain}/api/tables?filters[table_status][$eq]=Busy`,
      );
      setBusyTables(res.data.data || []);
    } catch (err) {
      console.error("Error fetching busy tables:", err);
    }
  };

  useEffect(() => {
    if (viewMode === "tables") fetchBusyTables();
  }, [viewMode]);

  const handleFreeTable = async (docId) => {
    try {
      await axios.put(`${domain}/api/tables/${docId}`, {
        data: { table_status: "Available" },
      });
      fetchBusyTables();
    } catch (err) {
      console.error("Failed to free table:", err);
    }
  };
  return (
    // 2. تمرير الداتا للـ Layout عشان التابات تشتغل
    <CasherLayout
      categories={categories}
      activeCategory={activeCategory}
      onSelectCategory={setActiveCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchInputRef={searchInputRef}
      clearSearch={clearSearch}
      viewMode={viewMode}
      onToggleView={() => setViewMode(viewMode === "menu" ? "tables" : "menu")}
    >
      {viewMode === "menu" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 mb-5 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {busyTables.length > 0 ? (
            busyTables.map((table) => (
              <div
                key={table.id}
                className="bg-white dark:bg-[#1A1110] p-6 rounded-[2rem] border-2 border-[#FF4500] shadow-xl flex flex-col items-center gap-4 animate-in zoom-in-95"
              >
                <span className="material-symbols-outlined text-4xl text-[#FF4500]">
                  restaurant
                </span>
                <div className="text-center">
                  <h3 className="font-black text-xl italic">
                    TABLE {table.table_number}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Currently Busy
                  </p>
                </div>
                <button
                  onClick={() => handleFreeTable(table.documentId)}
                  className="w-full py-3 bg-[#FF4500] text-white rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-all"
                >
                  Make Available
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 opacity-50">
              <h2 className="text-2xl font-black italic italic uppercase tracking-widest">
                No Busy Tables Right Now
              </h2>
            </div>
          )}
        </div>
      )}

      {/* حالات التحميل والخطأ */}
      {isLoading && <div className="text-center py-10">Loading Menu...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {/* شبكة المنتجات */}
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
