 import { MdCalendarToday } from "react-icons/md";

export default function EmptyReservations() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-border-light dark:border-border-dark bg-background-soft dark:bg-card-dark/50 font-display mt-8">
      <div className="size-16 rounded-full bg-white dark:bg-card-dark shadow-sm flex items-center justify-center mb-4">
        <MdCalendarToday className="text-3xl text-gray-400" />
      </div>

      <h3 className="text-[#181211] dark:text-white text-lg font-bold mb-2">
        No reservations yet
      </h3>

      <p className="text-text-muted dark:text-text-muted max-w-sm mb-6">
        Looks like you haven't booked a table with us yet. Find a table for your
        next special occasion.
      </p>

      <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-bold leading-normal transition-colors shadow-sm cursor-pointer">
        Find a Table
      </button>
    </div>
  );
}
