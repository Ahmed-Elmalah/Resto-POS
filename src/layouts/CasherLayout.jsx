import React from 'react';
import Header from '../components/casherComponents/Header';
import CategoryTabs from '../components/casherComponents/CategoryTabs';
import OrderSidebar from '../sections/casherSections/OrderSidebar';

export default function CasherLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-background-soft dark:bg-background-dark transition-colors duration-300 overflow-hidden text-gray-900 dark:text-white relative">
      
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        <header className="flex flex-col gap-4 p-4 md:p-6 pb-2 bg-background-soft/90 dark:bg-background-dark/95 backdrop-blur-md z-30 sticky top-0 transition-all">
          <Header />
          <CategoryTabs />
        </header>

        {/* Children (المنتجات) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
          {children}
        </div>
      </main>

      {/*(Order Details) */}
      <aside className="hidden lg:block w-[400px] border-l border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden">
        <OrderSidebar />
      </aside>

    </div>
  );
}