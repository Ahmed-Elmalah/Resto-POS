import { useState } from "react";
import { useAuthuser } from "../../store";
import { MdLogout, MdPerson, MdShoppingCart } from "react-icons/md";
import useLogin from "../../customHook/useLogin";
import { Link } from "react-router-dom";

export default function ActionsBtns() {
  const { user } = useAuthuser();
  const { logOut } = useLogin();

  return (
    <div>
      {user ? (
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
          <button
            onClick={logOut}
            className="group flex items-center justify-center size-10 rounded-lg hover:bg-primary/10 transition-colors"
            title="Logout"
          >
            <MdLogout size={20} className="text-text-main dark:text-white group-hover:text-primary" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
      <Link
        to="/login"
        className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
      >
        Log In
      </Link>

      <Link
        to="/signup"
        className="
            px-4 sm:px-6 py-2 sm:py-2.5 
            bg-primary hover:bg-red-600 hover:-translate-y-0.5
            text-white text-xs sm:text-sm font-bold 
            rounded-full 
            shadow-lg shadow-primary/25 hover:shadow-primary/40 
            transition-all duration-300 
            transform active:scale-95 whitespace-nowrap
        "
      >
        Sign Up
      </Link>
    </div>
      )}
    </div>
  );
}
