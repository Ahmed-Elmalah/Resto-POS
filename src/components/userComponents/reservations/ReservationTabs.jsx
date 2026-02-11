 
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
      </div>
    </div>
  );
}
