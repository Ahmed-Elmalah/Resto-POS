 import {
  MdCalendarMonth,
  MdEvent,
  MdSchedule,
  MdGroup,
  MdTableRestaurant,
  MdArrowForward,
} from "react-icons/md";

export default function ReservationWidget() {
  return (
    <section className="relative z-20 px-4 -mt-16 mb-16">
      <div className="max-w-275 bg-white dark:bg-background-dark mx-auto bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl border border-gray-100 dark:border-white/5 p-6 md:p-8">
        <h3 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
          <MdCalendarMonth className="text-primary" size={24} />
          Make a Reservation
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full h-12 rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-primary pl-10"
              />
              <MdEvent
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
            </div>
          </div>

          {/* Time Slot */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Time
            </label>
            <div className="relative">
              <select className="w-full h-12 rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-primary pl-10 appearance-none">
                <option>7:00 PM</option>
                <option>8:00 PM</option>
              </select>
              <MdSchedule
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Guests
            </label>
            <div className="relative">
              <select className="w-full h-12 rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-primary pl-10 appearance-none">
                <option>2 People</option>
                <option>4 People</option>
              </select>
              <MdGroup
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
            </div>
          </div>

          {/* Seating */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">
              Seating
            </label>
            <div className="relative">
              <select className="w-full h-12 rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white text-sm focus:ring-primary pl-10 appearance-none">
                <option>Indoor</option>
                <option>Outdoor</option>
              </select>
              <MdTableRestaurant
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button className="w-full h-12 rounded-lg bg-primary hover:opacity-90 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all">
              <span>Find Table</span>
              <MdArrowForward size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
