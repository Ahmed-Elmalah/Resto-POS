import React from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import useAdminStore from "../../../store/useAdminStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OrderFilters() {
  const { filters, setFilters, setSearchTerm } = useAdminStore();
  const dateOptions = [
    { label: "Today", value: "Today" },
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "Last 30 Days", value: "Last 30 Days" },
    { label: "All Time", value: "All" },
  ];
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({ startDate: start, endDate: end });
  };

  return (
    <div className="p-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 border-b border-slate-200 dark:border-[#283039]">
      <div className="flex  gap-3">
        <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#283039] border border-slate-200 dark:border-[#283039] text-sm font-medium hover:border-primary transition-all shadow-sm">
          <FiCalendar className="text-primary text-lg" />
          <DatePicker
            selectsRange={true}
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={handleDateChange}
            isClearable={true}
            placeholderText="Select Date Range"
            className="bg-transparent outline-none cursor-pointer dark:text-white font-bold w-[210px]"
          />
        </div>

        <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#283039] border border-slate-200 dark:border-[#283039] text-sm font-medium hover:border-primary transition-all shadow-sm">
          <span className="material-symbols-outlined text-lg text-slate-400">
            person
          </span>
          <select
            value={filters.cashier || "All"}
            onChange={(e) => setFilters({ cashier: e.target.value })}
            className="bg-transparent outline-none cursor-pointer appearance-none pr-6 dark:text-white font-bold"
          >
            <option value="All" className="dark:bg-[#1c2127]">
              Cashier: All
            </option>
            {filters.allCashiers?.map((name) => (
              <option
                key={name}
                value={name}
                className="bg-white dark:bg-[#1c2127] text-slate-700 dark:text-slate-200 py-2"
              >
                {name}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined text-lg absolute right-1 pointer-events-none text-slate-400">
            expand_more
          </span>
        </div>
      </div>

      <div className="relative group flex-1 max-w-[300px]">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <FiSearch className="text-slate-400 group-focus-within:text-primary transition-colors text-lg" />
        </div>

        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1c2127] border border-slate-200 dark:border-white/5 rounded-2xl text-sm font-medium dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
          placeholder="Search order ID or cashier..."
        />
      </div>
    </div>
  );
}
