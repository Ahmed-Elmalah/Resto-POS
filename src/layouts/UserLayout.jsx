import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // زودنا دول
import { MdRestaurant, MdMenu, MdClose } from "react-icons/md";
import ActionsBtns from "../components/userComponents/ActionsBtns";

export default function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", type: "scroll", target: "hero" },  
    { name: "Offers", type: "scroll", target: "offers" },
    { name: "Menu", type: "page", path: "/menu" },
    { name: "Reservations", type: "page", path: "/reservations" },
    { name: "About Us", type: "scroll", target: "about" },
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false); 

    if (item.type === "page") {
      navigate(item.path);
      window.scrollTo(0, 0); 
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(item.target);
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 100); 
      } else {
        const section = document.getElementById(item.target);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex flex-col min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 z-50 bg-white w-full border-b border-[#f3e9e7] dark:border-white/10 bg-surface-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                <MdRestaurant size={20} />
              </div>
              <h2 className="text-primary text-[15px] md:text-lg font-bold tracking-tight">
                Resto
              </h2>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Actions & Mobile Toggle */}
            <div className="flex items-center gap-3 md:gap-4">
               <ActionsBtns/>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#1a2632] border-b border-gray-100 dark:border-white/5 shadow-xl animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary dark:hover:text-primary transition-all"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="grow">
        <Outlet /> 
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