import React from "react";
import { MdAdd } from "react-icons/md";

// Header component for the Reservations page
export default function ReservationsHeader() {
  return (
    <div className="flex flex-wrap justify-between items-end gap-4 p-4 mb-2">
      {/* Title & Subtitle */}
      <div className="flex min-w-72 flex-col gap-2">
        <h1 className="text-[#181211] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">
          My Reservations
        </h1>
        <p className="text-text-muted dark:text-text-muted text-base font-normal leading-normal font-display">
          Manage your upcoming and past dining bookings
        </p>
      </div>

      {/* Book New Table Button */}
      <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm gap-2 font-display cursor-pointer">
        <MdAdd className="text-lg" />
        <span className="truncate">Book New Table</span>
      </button>
    </div>
  );
}
