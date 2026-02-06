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
        `${domain}/api/tables?filters[$or][0][table_status][$eq]=Busy&filters[$or][1][table_status][$eq]=Reserved`,
      );
      setBusyTables(res.data.data || []);
    } catch (err) {
      console.error("Error fetching busy tables:", err);
    }
  };

  const handleTableAction = async (docId, currentStatus) => {
    let nextStatus = "";

    if (currentStatus === "Reserved") nextStatus = "Available";
    else if (currentStatus === "Busy") nextStatus = "Available";

    try {
      await axios.put(`${domain}/api/tables/${docId}`, {
        data: { table_status: nextStatus },
      });
      await fetchBusyTables();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  useEffect(() => {
    if (viewMode === "tables") fetchBusyTables();
  }, [viewMode]);

  return (
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
        <>
          {isLoading && (
            <div className="text-center py-10 font-bold opacity-50">
              Loading Menu...
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-red-500">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 mb-5 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {busyTables.length > 0 ? (
            busyTables.map((table) => {
              const status =
                table?.table_status || table?.attributes?.table_status;
              const number =
                table?.table_number || table?.attributes?.table_number;
              const docId = table?.documentId || table?.id;

              const isReserved = status === "Reserved";

              return (
                <div
                  key={table.id}
                  className={`p-6 rounded-[2.5rem] border-2 shadow-xl flex flex-col items-center gap-4 transition-all duration-500 animate-in fade-in zoom-in-95 ${
                    isReserved
                      ? "bg-amber-50 dark:bg-amber-900/10 border-amber-500"
                      : "bg-red-50 dark:bg-red-900/10 border-[#ff4500]"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-5xl ${isReserved ? "text-amber-500" : "text-[#ff4500]"}`}
                  >
                    {isReserved ? "event_seat" : "restaurant"}
                  </span>

                  <div className="text-center">
                    <h3 className="font-black text-2xl italic tracking-tighter">
                      T-{number}
                    </h3>
                    <span
                      className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                        isReserved
                          ? "bg-amber-500 text-white"
                          : "bg-[#ff4500] text-white"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <button
                    onClick={() => handleTableAction(docId, status)}
                    className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all ${
                      isReserved
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-[#ff4500] text-white hover:bg-[#c73500] "
                    }`}
                  >
                    Set Available
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[3rem]">
              <span className="material-symbols-outlined text-6xl mb-4">
                check_circle
              </span>
              <h2 className="text-2xl font-black italic uppercase tracking-widest">
                All Tables Are Free
              </h2>
            </div>
          )}
        </div>
      )}

      {/* حالات التحميل والخطأ */}
      {isLoading && <div className="text-center py-10">Loading Menu...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}
    </CasherLayout>
  );
}
