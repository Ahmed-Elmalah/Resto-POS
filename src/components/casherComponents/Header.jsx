import { useNavigate } from 'react-router-dom';
import useLogin from '../../customHook/useLogin';
import ThemeToggle from '../ThemeToggle';

// استقبلنا الـ props الجديدة هنا
export default function Header({ searchQuery, setSearchQuery, searchInputRef, clearSearch }) {
  const {logOut} = useLogin();

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4 w-full">
      
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <ThemeToggle/>
        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-border-dark pl-4">
          <div className="size-10 bg-primary rounded-xl sm:flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 hidden ">
            <span className="material-symbols-outlined text-2xl">point_of_sale</span>
          </div>
          <div className="">
            <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">RestoPOS</h1>
            <p className="text-[10px] text-gray-500 dark:text-text-muted font-bold">Wed, Oct 24 • 12:30 PM</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex items-center gap-3 order-2 md:order-3">
        <button 
          onClick={logOut}
          className="flex items-center justify-center size-10 md:w-auto md:px-4 md:py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-100 dark:border-red-500/20 font-bold text-sm hover:bg-red-600 hover:text-white transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="hidden md:inline ml-2">Logout</span>
        </button>
      </div>

      {/* 3. Search Section (المكان اللي هيشتغل فيه السيرش) */}
      <div className="w-full md:flex-1 md:max-w-md relative group order-3 md:order-2">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF4500] transition-colors">search</span>
        
        <input 
          ref={searchInputRef} // 1. ربطنا الـ Ref
          value={searchQuery}  // 2. ربطنا القيمة
          onChange={(e) => setSearchQuery(e.target.value)} // 3. التحديث اللحظي
          className="w-full p-3 pl-10 pr-10 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1110] text-gray-900 dark:text-white outline-none focus:border-[#FF4500] transition-all shadow-sm" 
          placeholder="Search menu items..." 
          type="text"
        />

        {/* زرار المسح (Clear) بيظهر بس لو فيه كتابة */}
        {searchQuery && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

    </div>
  );
}