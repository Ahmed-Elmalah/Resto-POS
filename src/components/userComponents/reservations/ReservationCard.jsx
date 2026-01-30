 import {
  MdSchedule,
  MdGroup,
  MdChair,
  MdClose,
  MdCheck,
  MdEdit,
  MdDeck,
} from "react-icons/md";

// Card component displaying reservation details
export default function ReservationCard({ reservation }) {
  // Determine status color and icon based on reservation status
  const isConfirmed = reservation.status === "Confirmed";

  return (
    <div className="group flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-card-dark p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-border-dark hover:shadow-md transition-shadow font-display">
      {/* Left Side: Details */}
      <div className="flex flex-col justify-between flex-[2_2_0px] gap-4">
        <div className="flex flex-col gap-3">
          {/* Status Badge */}
          <div className="flex items-center justify-between md:justify-start gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider 
              ${
                isConfirmed
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
              }`}
            >
              {isConfirmed ? (
                <MdCheck className="text-sm font-bold" />
              ) : (
                <span className="size-2 rounded-full bg-yellow-500"></span>
              )}
              {reservation.status}
            </span>
          </div>

          {/* Date & Time */}
          <div>
            <h3 className="text-[#181211] dark:text-white text-xl font-bold leading-tight mb-1">
              {reservation.date}
            </h3>
            <div className="flex items-center gap-2 text-text-muted dark:text-text-muted text-sm font-medium">
              <MdSchedule className="text-lg" />
              {reservation.time}
            </div>
          </div>

          {/* Info Tags (Guests, Location) */}
          <div className="flex flex-wrap gap-4 mt-1">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
              <MdGroup className="text-primary text-lg" />
              {reservation.guests} Guests
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
              {isConfirmed ? (
                <MdDeck className="text-primary text-lg" />
              ) : (
                <MdChair className="text-primary text-lg" />
              )}
              {reservation.location}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isConfirmed ? (
          // Confirmed Actions
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold leading-normal w-fit transition-colors gap-2 cursor-pointer">
              <MdEdit className="text-lg" />
              Modify
            </button>
            <button className="flex items-center justify-center rounded-lg h-9 px-4 text-primary text-sm font-medium leading-normal w-fit transition-colors hover:underline cursor-pointer">
              View Details
            </button>
          </div>
        ) : (
          // Pending Actions
          <button className="flex items-center justify-center rounded-lg h-9 px-4 border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-border-dark text-gray-700 dark:text-gray-300 text-sm font-medium leading-normal w-fit transition-colors gap-2 cursor-pointer">
            <MdClose className="text-lg" />
            <span className="truncate">Cancel Request</span>
          </button>
        )}
      </div>

      {/* Right Side: Image */}
      <div
        className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-auto bg-center bg-no-repeat bg-cover rounded-lg"
        style={{ backgroundImage: `url("${reservation.image}")` }}
      ></div>
    </div>
  );
}
