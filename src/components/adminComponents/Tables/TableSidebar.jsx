import React, { useEffect, useState } from "react";
import { reservationRepo } from "../../../customHook/reservationRepo"; // Import Repo
import { MdCalendarToday, MdAccessTime, MdPerson } from "react-icons/md";

export default function TableSidebar({ activeTable, onClose }) {
  const item = activeTable?.attributes || activeTable;
  const isOpen = !!activeTable;

  // State for reservations list
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Status Colors Config
  const statusConfig = {
    Available:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    Busy: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    Reserved:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  };

  // --- Effect: Fetch Reservations when table changes ---
  useEffect(() => {
    if (activeTable) {
      const fetchReservations = async () => {
        setLoading(true);
        try {
          // Get today's date (YYYY-MM-DD)
          const today = new Date().toISOString().split("T")[0];
          const tableId = activeTable.documentId || activeTable.id;

          // Fetch from API
          const res = await reservationRepo.getByTable(tableId, today);
          setReservations(res.data.data || []);
        } catch (error) {
          console.error("Error loading table reservations", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReservations();
    } else {
      setReservations([]); // Clear if closed
    }
  }, [activeTable]);

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
        fixed top-0 right-0 h-full z-110
        w-95 max-w-[90%] 
        /* Background & Border for both modes */
        bg-white dark:bg-[#0f172a] 
        border-l border-slate-200 dark:border-slate-800 
        shadow-2xl flex flex-col
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:relative lg:translate-x-0 lg:z-20
      `}
      >
        {!activeTable ? (
          // Empty State (No table selected)
          <div className="hidden lg:flex flex-col h-full items-center justify-center font-bold text-slate-400 dark:text-slate-500">
            Choose Table
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-700">
            {/* --- Header --- */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Table T-{item.table_number}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusConfig[item.table_status]}`}
                  >
                    {item.table_status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Capacity: {item.capacity} People
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
              >
                <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white">
                  close
                </span>
              </button>
            </div>

            {/* --- Content Area --- */}
            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-[#0f172a] space-y-8">
              {/* 1. Upcoming Reservations Section */}
              <div>
                <h4 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <MdCalendarToday /> Upcoming Reservations
                </h4>

                {loading ? (
                  <div className="text-xs text-slate-400 animate-pulse">
                    Checking schedule...
                  </div>
                ) : reservations.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {reservations.map((res) => (
                      <div
                        key={res.id}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between group hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            {/* Guest Name if available, else generic */}
                            <MdPerson className="text-slate-400" />
                            {res.users_permissions_user?.username || "Guest"}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <span>{res.reservation_date}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{res.guest_count} ppl</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <MdAccessTime size={14} />
                            {res.start_time?.slice(0, 5)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                    No upcoming reservations
                  </div>
                )}
              </div>

              {/* 2. Current Order Section (Placeholder) */}
              <div>
                <h4 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                  Current Order
                </h4>
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                  <span className="material-symbols-outlined text-4xl mb-2 text-slate-200 dark:text-slate-700">
                    receipt_long
                  </span>
                  <p className="text-xs font-bold text-slate-300 dark:text-slate-600">
                    No active orders
                  </p>
                </div>
              </div>
            </div>

            {/* --- Footer --- */}
            <div className="p-6 bg-slate-50 dark:bg-[#0b1120] border-t border-slate-100 dark:border-slate-800">
              <button className="w-full py-4 bg-[#007aff] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                {item.table_status === "Available"
                  ? "Open New Order"
                  : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
