import React, { useState } from "react";
import Header from "../components/casherComponents/Header";
// بنستخدم تابات اليوزر زي ما طلبت
import CategoryTabs from "../components/userComponents/menu/CategoryTabs";
import OrderSidebar from "../sections/casherSections/OrderSidebar";
import useOrderStore from "../store/useOrderStore";

// ضفنا Props جديدة هنا عشان التابات تشتغل
export default function CasherLayout({
  children,
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  clearSearch,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useOrderStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] dark:bg-[#1A1110] overflow-hidden text-gray-900 dark:text-white relative transition-colors duration-300">
      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        <header className="flex flex-col gap-4 p-4 md:p-6 pb-2 bg-[#f8f9fa]/80 dark:bg-[#1A1110]/95 backdrop-blur-md z-30 sticky top-0 border-b border-gray-100 dark:border-white/5">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchInputRef={searchInputRef}
            clearSearch={clearSearch}
          />

          {/* هنا ربطنا التابات بالداتا اللي جاية من بره */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={onSelectCategory}
          />
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
          {children}
        </div>
      </main>

      {/* --- زرار FAB --- */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className="relative size-16 bg-[#FF4500] text-white rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-all border-2 border-white "
        >
          <span className="material-symbols-outlined text-3xl">
            shopping_cart
          </span>

          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex min-w-[24px] h-[24px] px-1 items-center justify-center rounded-md bg-[#FF4500] text-white text-[12px] font-black border-2 border-white shadow-md ">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* SideBar */}
      <aside
        className={`
        fixed inset-y-0 right-0 z-[110] w-[85%] sm:w-[400px] bg-white dark:bg-[#1A1110] border-l border-gray-200 dark:border-white/5 shadow-2xl transition-transform duration-500
        lg:relative lg:translate-x-0 lg:w-[400px] lg:block
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute left-[-44px] top-10 size-11 bg-white dark:bg-[#1A1110] border-l border-t border-b border-gray-200 dark:border-white/10 rounded-l-xl flex items-center justify-center text-[#FF4500] shadow-md"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              close
            </span>
          </button>
        )}

        <OrderSidebar />
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[105]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
