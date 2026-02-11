import {
  MdAccessTime,
  MdPeople,
  MdTableRestaurant,
  MdCancel,
  MdCheckCircle,
  MdHourglassEmpty,
  MdHistory,
} from "react-icons/md";
import Swal from "sweetalert2";
import { reservationRepo } from "../../../customHook/reservationRepo";
import { useAuthuser } from "../../../store";

export default function ReservationCard({ reservation, onCancelSuccess }) {
  const { user } = useAuthuser();

  // Destructure data
  const { id, status, date, time, endTime, guests, location } = reservation;

  // --- 1. Helper: Format Date for the "Date Box" ---
  const getDayAndMonth = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate();
    // Get short month name (e.g., "Oct")
    const month = d.toLocaleString("default", { month: "short" });
    const weekday = d.toLocaleString("default", { weekday: "short" });
    return { day, month, weekday };
  };

  const { day, month, weekday } = getDayAndMonth(date);

  // --- 2. Styles Config based on Status ---
  const statusConfig = {
    confirmed: {
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-900",
      icon: <MdCheckCircle />,
      label: "Confirmed",
    },
    pending: {
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-900",
      icon: <MdHourglassEmpty />,
      label: "Pending",
    },
    cancelled: {
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-100 dark:border-red-900",
      icon: <MdCancel />,
      label: "Cancelled",
    },
    completed: {
      color: "text-gray-500 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800",
      border: "border-gray-100 dark:border-gray-700",
      icon: <MdHistory />,
      label: "Completed",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.confirmed;

  // --- 3. Cancel Logic ---
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Reservation?",
      text: "Are you sure? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#cbd5e1",
      confirmButtonText: "Yes, cancel it!",
      background: document.documentElement.classList.contains("dark")
        ? "#1e293b"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    });

    if (result.isConfirmed) {
      try {
        await reservationRepo.cancel(id, user.token);
        if (onCancelSuccess) onCancelSuccess();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: document.documentElement.classList.contains("dark")
            ? "#1e293b"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        });
        Toast.fire({ icon: "success", title: "Reservation cancelled" });
      } catch (error) {
        Swal.fire("Error", "Failed to cancel", "error");
      }
    }
  };

  return (
    <div
      className={`group relative bg-white dark:bg-[#1e1e1e] rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden
      ${currentStatus.border} ${status === "cancelled" ? "opacity-75 grayscale-[0.5]" : "border-gray-100 dark:border-gray-800"}`}
    >
      {/* --- Card Layout: Flex --- */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* 1. Date Box (Left Side) */}
        <div className="sm:w-24 bg-gray-50 dark:bg-[#252525] flex flex-row sm:flex-col items-center justify-between sm:justify-center p-4 sm:p-0 border-b sm:border-b-0 sm:border-r border-dashed border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <span className="block text-xs font-bold uppercase text-red-500 tracking-wider mb-1">
              {month}
            </span>
            <span className="block text-3xl font-black text-gray-800 dark:text-white leading-none">
              {day}
            </span>
            <span className="block text-xs text-gray-400 mt-1 font-medium">
              {weekday}
            </span>
          </div>
          {/* Mobile Status Badge (Visible only on mobile inside date box) */}
          <div
            className={`sm:hidden px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${currentStatus.bg} ${currentStatus.color}`}
          >
            {currentStatus.icon} {currentStatus.label}
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          {/* Top Row: Time & Desktop Status */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                {location}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
                <MdAccessTime className="text-primary" />
                <span className="font-medium">
                  {time} {endTime ? `- ${endTime}` : ""}
                </span>
              </div>
            </div>

            {/* Status Badge (Desktop) */}
            <div
              className={`hidden sm:flex px-3 py-1 rounded-full text-xs font-bold items-center gap-1.5 border ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border}`}
            >
              {currentStatus.icon}
              {currentStatus.label}
            </div>
          </div>

          {/* Bottom Row: Guests & Actions */}
          <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                <MdPeople size={16} />
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase">
                  Guests
                </span>
                <span className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                  {guests} People
                </span>
              </div>
            </div>

            {/* Cancel Button */}
            {(status === "confirmed" || status === "pending") && (
              <button
                onClick={handleCancel}
                className="group/btn flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-bold"
              >
                <span>Cancel</span>
                <MdCancel className="text-lg group-hover/btn:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Decorative Side Line (Optional chic touch) */}
        <div
          className={`w-1.5 h-full absolute left-0 top-0 sm:relative sm:left-auto sm:top-auto ${status === "confirmed" ? "bg-green-500" : status === "pending" ? "bg-amber-500" : "bg-gray-300"}`}
        ></div>
      </div>
    </div>
  );
}
