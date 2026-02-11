import {
  MdCheckCircle,
  MdError,
  MdEvent,
  MdAccessTime,
  MdPeople,
} from "react-icons/md";

export default function BookingConfirmationView({
  bookingData,
  targetTable,
  checkingTables,
  isSubmitting,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] flex items-center justify-center p-4 font-display">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative bg-gray-900 h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            alt="Restaurant Ambiance"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Confirm Your Visit
            </h2>
            <p className="text-gray-300 text-sm">
              Experience the best dining atmosphere with us.
            </p>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-4">
            Reservation Summary
          </h3>

          <div className="space-y-6 mb-8">
            {/* Date */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <MdEvent size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Date
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {bookingData.date}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <MdAccessTime size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Time
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {bookingData.time.slice(0, 5)}
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <MdPeople size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Guests
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {bookingData.guests} People ({bookingData.seating})
                </p>
              </div>
            </div>

            {/* Availability Status Badge */}
            <div
              className={`p-3 rounded-lg flex items-center gap-3 text-sm font-bold border
                ${
                  targetTable
                    ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
            >
              {checkingTables ? (
                <span className="animate-pulse">Checking availability...</span>
              ) : targetTable ? (
                <>
                  <MdCheckCircle size={18} />
                  <span>
                    Table {targetTable.table_number || "Selected"} Available
                  </span>
                </>
              ) : (
                <>
                  <MdError size={18} />
                  <span>No tables available for this time.</span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <button
              onClick={onCancel}
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting || checkingTables || !targetTable}
              className="flex-1 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}