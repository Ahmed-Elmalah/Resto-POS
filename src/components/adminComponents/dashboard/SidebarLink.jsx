// ده الكومبوننت المسؤول عن شكل اللينك الواحد
const SidebarLink = ({ path, label, icon, end, onClick }) => (
  <NavLink
    to={path}
    onClick={onClick}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group overflow-hidden whitespace-nowrap
      ${isActive
        ? "bg-primary text-white shadow-md shadow-primary/20"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary"
      }
      md:justify-center lg:justify-start`
    }
  >
    <span className="shrink-0">{icon}</span>
    {/* الاسم بيختفي في التابلت ويظهر في الموبايل والديسكتوب */}
    <span className="text-sm font-medium md:hidden lg:block">{label}</span>
  </NavLink>
);