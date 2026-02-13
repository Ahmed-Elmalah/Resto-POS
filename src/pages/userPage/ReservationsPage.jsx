import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Hooks & Store
import { useAuthuser } from "../../store/index";
import { useReservation } from "../../customHook/useReservation";
import { reservationRepo } from "../../customHook/reservationRepo";

// Components
import ReservationsHeader from "../../components/userComponents/reservations/ReservationsHeader";
import EmptyReservations from "../../components/userComponents/reservations/EmptyReservations";
import ReservationCard from "../../components/userComponents/reservations/ReservationCard";
import BookingConfirmationView from "../../components/userComponents/reservations/BookingConfirmationView";
import ReservationWidget from "../../components/userComponents/ReservationWidget"; // الويدجيت

export default function ReservationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthuser();

  // Booking Data (from Widget)
  const bookingData = location.state?.reservationData;

  // --- State ---
  // 1. Active Tab State ('book' or 'list')
  const [activeTab, setActiveTab] = useState("book");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [targetTable, setTargetTable] = useState(null);
  const [myReservations, setMyReservations] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Custom Hook
  const {
    checkAvailability,
    availableTables,
    loading: checkingTables,
  } = useReservation();

  // --- Effects ---
  // 1. Check Availability (Only if confirming)
  useEffect(() => {
    if (bookingData) {
      checkAvailability(bookingData.date, bookingData.time, bookingData.guests);
    }
  }, [bookingData]);

  // 2. Auto-select table
  useEffect(() => {
    if (availableTables.length > 0) {
      setTargetTable(availableTables[0]);
    }
  }, [availableTables]);

  // 3. Fetch History (When switching to 'list' tab)
  useEffect(() => {
    const fetchMyReservations = async () => {
      if (!user || activeTab !== "list") return; // Fetch only when tab is active

      setIsLoadingList(true);
      try {
        const res = await reservationRepo.getUserReservations(
          user.id,
          user.token,
        );
        setMyReservations(res.data.data || []);
      } catch (error) {
        console.error("Fetch reservations error:", error);
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchMyReservations();
  }, [user, activeTab]); // Run when tab changes

  // --- Handlers ---
  const handleConfirmReservation = async () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login first",
        icon: "info",
        background: document.documentElement.classList.contains("dark")
          ? "#1e293b"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      });
      navigate("/login", {
        state: { from: "/reservations", reservationData: bookingData },
      });
      return;
    }

    if (!targetTable) return;

    setIsSubmitting(true);
    try {
      const payload = {
        reservation_date: bookingData.date,
        start_time: bookingData.time,
        end_time: calculateEndTime(bookingData.time),
        guest_count: bookingData.guests,
        res_status: "confirmed",
        users_permissions_user: user.id,
        table: targetTable.documentId || targetTable.id,
        special_request: bookingData.seating,
      };

      await reservationRepo.create(payload, user.token);

      Swal.fire({
        icon: "success",
        title: "Reserved Successfully!",
        confirmButtonColor: "#d39f4f",
      });

      // After success, switch to list view
      navigate("/reservations", { replace: true, state: {} });
      setActiveTab("list");
      window.location.reload();
    } catch (error) {
      Swal.fire("Error", "Booking failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHour = hours + 1;
    return `${endHour < 10 ? "0" + endHour : endHour}:${minutes < 10 ? "0" + minutes : minutes}:00`;
  };

  const handleCancelSuccess = () => {
    // Reload list logic
    window.location.reload();
  };

  // --- VIEW 1: CONFIRMATION MODE (If coming from widget with data) ---
  if (bookingData) {
    return (
      <BookingConfirmationView
        bookingData={bookingData}
        targetTable={targetTable}
        checkingTables={checkingTables}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmReservation}
        onCancel={() => navigate("/")}
      />
    );
  }

  // --- VIEW 2: MAIN PAGE (Tabs Mode) ---
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display pb-20">
      {/* 1. Header Area */}
      <div className="bg-surface-light dark:bg-surface-dark shadow-xs pt-24 pb-10 px-4 text-center">
        <h1
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-2"
        >
          Reservations
        </h1>
        <p
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-gray-500 dark:text-gray-400"
        >
          Book a new table or manage your existing bookings
        </p>

        {/* 2. TAB SWITCHER (The Chic Part) */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="mt-8 flex justify-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex relative">
            {/* Active Tab Background Animation (Simple version: just conditional classes) */}
            <button
              onClick={() => setActiveTab("book")}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "book"
                  ? "bg-white dark:bg-[#1a1a1a] text-primary shadow-sm"
                  : "text-gray-500 hover:text-red-700 dark:text-gray-400"
              }`}
            >
              Book a Table
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "list"
                  ? "bg-white dark:bg-[#1a1a1a] text-primary shadow-sm"
                  : "text-gray-500 hover:text-red-700 dark:text-gray-400"
              }`}
            >
              My History
            </button>
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="px-4 md:px-10 lg:px-40 mt-8">
        {/* A) BOOK TAB CONTENT */}
        {activeTab === "book" && (
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            {/* Wrap Widget in a clean container to fix margins */}
            <div className="pt-4">
              <ReservationWidget />
            </div>

            {/* Helper Text */}
            <div className="text-center mt-8 text-gray-400 text-sm">
              <p>
                Need help with a large party? Call us directly at (555) 123-4567
              </p>
            </div>
          </div>
        )}

        {/* B) HISTORY TAB CONTENT */}
        {activeTab === "list" && (
          <div className="max-w-2xl mx-auto flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {isLoadingList ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading reservations...</p>
              </div>
            ) : myReservations.length > 0 ? (
              myReservations.map((res) => (
                <ReservationCard
                  key={res.id || res.documentId}
                  reservation={{
                    id: res.documentId || res.id,
                    status: res.res_status,
                    date: res.reservation_date,
                    time: res.start_time?.slice(0, 5),
                    endTime: res.end_time?.slice(0, 5),
                    guests: res.guest_count,
                    location: `${res.special_request || "Indoor"} • Table ${res.table?.table_number || "?"}`,
                    image:
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=60",
                  }}
                  onCancelSuccess={handleCancelSuccess}
                />
              ))
            ) : (
              <div className="flex flex-col items-center text-center py-10">
                <EmptyReservations />
                <button
                  onClick={() => setActiveTab("book")}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Start your first reservation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
