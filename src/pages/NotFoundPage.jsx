 import { Link } from "react-router-dom";
import { MdRestaurantMenu, MdHome, MdSearch } from "react-icons/md";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-background-dark font-display px-4 text-center">
      
      {/* 1. Visual Icon with Animation */}
      <div className="relative mb-8 animate-bounce-slow">
        <div className="size-32 rounded-full bg-primary/10 flex items-center justify-center">
          <MdRestaurantMenu className="text-6xl text-primary opacity-80" />
        </div>
        {/* Question mark badge */}
        <div className="absolute -top-2 -right-2 bg-white dark:bg-card-dark rounded-full p-2 shadow-lg border border-gray-100 dark:border-border-dark">
          <MdSearch className="text-2xl text-primary" />
        </div>
      </div>

      {/* 2. Typography & Message */}
      <h1 className="text-8xl font-black text-gray-200 dark:text-[#2e1a17] select-none">
        404
      </h1>
      
      <div className="relative -mt-12 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181211] dark:text-white mb-3">
          Oops! This item is off the menu.
        </h2>
        <p className="text-text-muted dark:text-text-muted max-w-md mx-auto text-base md:text-lg leading-relaxed">
          We looked everywhere, even inside the oven, but we couldn't find the page you're looking for.
        </p>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-bold shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <MdHome className="text-xl" />
          Back to Home
        </Link>
        
        <Link
          to="/menu"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-transparent border-2 border-gray-200 dark:border-border-dark text-[#181211] dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-[#3a2520] transition-all"
        >
          <MdRestaurantMenu className="text-xl" />
          View Menu
        </Link>
      </div>

      {/* Decorative Elements (Background blobs) */}
      <div className="fixed top-1/4 left-10 size-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-10 size-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

    </div>
  );
}