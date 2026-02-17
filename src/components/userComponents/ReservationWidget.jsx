import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCalendarMonth,
  MdSchedule,
  MdGroup,
  MdTableRestaurant,
  MdArrowForward,
} from "react-icons/md";
import { useReservation } from "../../customHook/useReservation";
import Swal from "sweetalert2";

export default function ReservationWidget() {
  const navigate = useNavigate();

  // --- Local State ---
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Indoor");

  // --- Custom Hook Logic ---
  const { checkAvailability, loading, timeSlots } = useReservation();

  // --- Handle Submit ---
  const handleFindTable = async (e) => {
    e.preventDefault();

    // 1. Validate inputs
    if (!date || !time) {
      Swal.fire("Missing Info", "Please select date and time!", "warning");
      return;
    }

    await checkAvailability(date, time, guests);

    navigate("/reservations", {
      state: {
        reservationData: { date, time, guests, seating },
      },
    });
  };

  const formatTime12H = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const strHours = hours12 < 10 ? `0${hours12}` : hours12;
    return `${strHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  };

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1200"
      className="relative z-20 px-4 -mt-16 mb-16"
    >
      <div className="max-w-275 bg-white dark:bg-background-dark mx-auto bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl border border-gray-100 dark:border-white/5 p-6 md:p-8">
        {/* Widget Header */}
        <h3 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
          <MdCalendarMonth className="text-primary" size={24} />
          Make a Reservation
        </h3>

        <form
          onSubmit={handleFindTable}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {/* 1. Date Picker */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Disable past days
                className="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary pl-10 outline-none transition-all cursor-pointer"
                required
              />
              <MdCalendarMonth
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* 2. Time Select (Dropdown) - FIXED */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Time
            </label>
            <div className="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary pl-10 outline-none appearance-none cursor-pointer transition-all"
                required
              >
                <option value="" disabled>
                  Select Time
                </option>

                {timeSlots && timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {formatTime12H(slot)}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading hours...</option>
                )}

              </select>
              <MdSchedule
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* 3. Guests Count */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Guests
            </label>
            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary pl-10 outline-none appearance-none cursor-pointer transition-all"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} People
                  </option>
                ))}
              </select>
              <MdGroup
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* 4. Seating Type */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Seating
            </label>
            <div className="relative">
              <select
                value={seating}
                onChange={(e) => setSeating(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary pl-10 outline-none appearance-none cursor-pointer transition-all"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
              <MdTableRestaurant
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  <span>Find Table</span>
                  <MdArrowForward size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
