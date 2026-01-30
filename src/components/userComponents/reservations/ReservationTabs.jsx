 
// Tabs for switching between Upcoming and Past reservations
export default function ReservationTabs() {
  return (
    <div className="px-4 mb-6 font-display">
      <div className="flex border-b border-border-light dark:border-border-dark gap-8">
        {/* Active Tab (Upcoming) */}
        <a
          className="flex flex-col items-center justify-center border-b-[3px] border-primary pb-3.25 pt-4 px-2 cursor-pointer"
          href="#"
        >
          <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]">
            Upcoming
          </p>
        </a>

        {/* Inactive Tab (Past) */}
        <a
          className="flex flex-col items-center justify-center border-b-[3px] border-transparent hover:border-gray-300 dark:hover:border-gray-600 pb-3.25 pt-4 px-2 transition-colors cursor-pointer"
          href="#"
        >
          <p className="text-text-muted dark:text-text-muted hover:text-[#181211] dark:hover:text-white text-sm font-bold leading-normal tracking-[0.015em]">
            Past
          </p>
        </a>
      </div>
    </div>
  );
}
