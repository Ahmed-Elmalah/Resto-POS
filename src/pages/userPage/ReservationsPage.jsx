 import ReservationsHeader from "../../components/userComponents/reservations/ReservationsHeader";
import ReservationTabs from "../../components/userComponents/reservations/ReservationTabs";
import ReservationCard from "../../components/userComponents/reservations/ReservationCard";
import EmptyReservations from "../../components/userComponents/reservations/EmptyReservations";

// Mock Data matching your HTML example
const reservationsData = [
  {
    id: 1,
    status: "Pending",
    date: "Saturday, Oct 24",
    time: "7:00 PM",
    guests: 4,
    location: "Main Dining Room",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    status: "Confirmed",
    date: "Friday, Nov 02",
    time: "8:00 PM",
    guests: 2,
    location: "Patio Seating",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=60"
  }
];

export default function ReservationsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      
      <div className="flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center mt-5 py-8">
          <div className="flex flex-col max-w-240 flex-1 w-full">
            
            {/* 1. Header Section */}
            <ReservationsHeader />

            {/* 2. Tabs Section */}
            <ReservationTabs />

            {/* 3. Reservations List */}
            <div className="flex flex-col gap-6 p-4">
              
              {reservationsData.length > 0 ? (
                reservationsData.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))
              ) : (
                <EmptyReservations />
              )}
              
              {/* Optional: Show Empty State Demo (remove in production) */}
              {/* <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-4">Example Empty State View</h4>
                  <EmptyReservations />
              </div> */}

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}