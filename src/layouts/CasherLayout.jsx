import React, { useState } from 'react';
import OrderSidebar from "../sections/casherSections/OrderSidebar";

export default function CasherLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-background-soft dark:bg-background-dark transition-colors duration-300 overflow-hidden text-gray-900 dark:text-white relative font-sans">
      
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {children}
      </main>

      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-[400px] bg-white dark:bg-card-dark shadow-2xl transition-transform duration-500 lg:relative lg:translate-x-0 lg:w-[400px] lg:border-l lg:border-gray-200 lg:dark:border-border-dark ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        {isSidebarOpen && (
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute left-[-45px] top-4 size-10 bg-primary rounded-l-full flex items-center justify-center text-white"><span className="material-symbols-outlined">close</span></button>
        )}
        <OrderSidebar />
      </div>

      {!isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed bottom-6 right-6 z-30 size-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-white"><span className="material-symbols-outlined text-3xl">shopping_cart</span></button>
      )}
    </div>
  );
}