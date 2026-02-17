import { useState, useEffect } from 'react';
import axios from 'axios';
import { domain } from '../store';
import { tableRepo } from './tableRepo';
import { reservationRepo } from './reservationRepo';
import Swal from 'sweetalert2';

export const useReservation = () => {
  const [availableTables, setAvailableTables] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]); // State for generated time slots
  const [loading, setLoading] = useState(false);

  // --- 1. Fetch Settings & Generate Time Slots on Mount ---
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Get settings from Strapi
        const res = await axios.get(`${domain}/api/restaurant-setting`);
        const data = res.data.data?.attributes || res.data.data;

        if (data) {
          generateTimeSlots(data.opening_time, data.closing_time);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        // Fallback times if API fails
        setTimeSlots(["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]);
      }
    };

    fetchSettings();
  }, []);

  // --- Helper: Generate Time List ---
 const generateTimeSlots = (openTimeStr, closeTimeStr) => {
    if (!openTimeStr || !closeTimeStr) return;

    let startHour = parseInt(openTimeStr.split(':')[0]);
    let closeHour = parseInt(closeTimeStr.split(':')[0]);

    if (closeHour <= startHour) {
        closeHour += 24;
    }
    
    const lastBookingHour = closeHour - 1; 

    const slots = [];
    for (let i = startHour; i <= lastBookingHour; i++) {
      const currentHour = i % 24;
      
      const hourString = `${currentHour < 10 ? '0' + currentHour : currentHour}:00`;
      slots.push(hourString);
    }
    
    setTimeSlots(slots);
  };
  // --- Helper: Convert "14:30" to Minutes ---
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // --- 2. Check Availability Function ---
  const checkAvailability = async (date, time, guests) => {
    setLoading(true);
    setAvailableTables([]);

    try {
      // A. Get all tables
      const tablesRes = await tableRepo.getAll(); 
      const allTables = tablesRes.data.data || [];

      // B. Filter by Capacity
      const suitableTables = allTables.filter(t => {
        const capacity = t.capacity || t.attributes?.capacity;
        return capacity >= guests;
      });

      if (suitableTables.length === 0) {
        setLoading(false);
        return Swal.fire('Sorry', 'No tables found for this number of guests', 'info');
      }

      // C. Get Reservations for that Date
      const reservationsRes = await reservationRepo.getByDate(date);
      const daysReservations = reservationsRes.data.data || [];

      // D. Time Overlap Logic
      const DURATION = 60; // 1 Hour per booking
      const reqStart = timeToMinutes(time); 
      const reqEnd = reqStart + DURATION;

      // Filter for free tables
      const freeTables = suitableTables.filter(table => {
        const tableId = table.documentId || table.id;

        // Get reservations specific to this table
        const tableReservations = daysReservations.filter(res => {
          const resTable = res.table || res.attributes?.table?.data;
          // Strapi ID check (handle both formats)
          return (resTable?.documentId === tableId || resTable?.id === tableId);
        });

        // Check for conflicts
        const hasConflict = tableReservations.some(res => {
          const resStart = timeToMinutes(res.start_time || res.attributes?.start_time);
          const resEnd = timeToMinutes(res.end_time || res.attributes?.end_time);

          // Overlap Formula: (StartA < EndB) && (EndA > StartB)
          return (reqStart < resEnd) && (reqEnd > resStart);
        });

        // Return table if no conflict
        return !hasConflict; 
      });

      setAvailableTables(freeTables);

      if (freeTables.length === 0) {
         Swal.fire('Fully Booked', `No tables available at ${time}`, 'warning');
      }

    } catch (error) {
      console.error("Check Availability Error:", error);
      Swal.fire('Error', 'Failed to check availability', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    timeSlots,
    availableTables,
    loading,
    checkAvailability
  };
};