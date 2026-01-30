import { useAuthuser } from "../../store";
import { MdLogout, MdPerson, MdShoppingCart } from "react-icons/md";
import useLogin from "../../customHook/useLogin";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

export default function ActionsBtns() {
  const { user } = useAuthuser();
  const { logOutForUser } = useLogin();

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-1 md:gap-3">
          {/* Theme Toggle */}
          <div className="scale-90 md:scale-100">
            <ThemeToggle />
          </div>

          {/* Person Button */}
          <Link
            to="/profile" 
            className="group flex items-center justify-center size-8 md:size-10 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <MdPerson
              className="text-text-main dark:text-white group-hover:text-primary transition-colors"
              size={20}
            />
          </Link>

          {/* Cart Button */}
          {/* <button className="relative group flex items-center justify-center size-8 md:size-10 rounded-lg hover:bg-primary/10 transition-colors">
            <MdShoppingCart
              className="text-text-main dark:text-white group-hover:text-primary transition-colors"
              size={20}
            />
            <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 size-1.5 md:size-2 bg-primary rounded-full ring-1 md:ring-2 ring-white dark:ring-background-dark"></span>
          </button> */}

          {/* Logout Button */}
          <button
            onClick={logOutForUser}
            className="group flex items-center justify-center size-8 md:size-10 rounded-lg hover:bg-primary/10 transition-colors"
            title="Logout"
          >
            <MdLogout
              size={18}
              className="text-text-main dark:text-white group-hover:text-primary transition-colors md:w-5 md:h-5"
            />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <div className="scale-80 md:scale-100">
            <ThemeToggle />
          </div>
          <Link
            to="/login"
            className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="
                px-3 sm:px-6 py-2 sm:py-2.5 
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
