import React from "react";
import { Outlet } from "react-router-dom";
import { MdRestaurant, MdPerson, MdShoppingCart } from "react-icons/md";

export default function UserLayout() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex flex-col min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f3e9e7] dark:border-white/10 bg-surface-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                <MdRestaurant size={20} />
              </div>
              <h2 className="text-text-main dark:text-white text-lg font-bold tracking-tight">
                Savory<span className="text-primary">Bites</span>
              </h2>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Home", "Menu", "Reservations", "About Us"].map((item) => (
                <a
                  key={item}
                  className="text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button className="group flex items-center justify-center size-10 rounded-lg hover:bg-primary/10 transition-colors">
                <MdPerson
                  className="text-text-main dark:text-white group-hover:text-primary"
                  size={24}
                />
              </button>
              <button className="relative group flex items-center justify-center size-10 rounded-lg hover:bg-primary/10 transition-colors">
                <MdShoppingCart
                  className="text-text-main dark:text-white group-hover:text-primary"
                  size={24}
                />
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-background-dark"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet /> {/* هنا الصفحات هتتغير */}
      </main>

      <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-text-muted dark:text-gray-500">
            © 2026 SavoryBites Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
