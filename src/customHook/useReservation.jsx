import { useState } from 'react';
import { tableRepo } from './tableRepo';
import { reservationRepo } from './reservationRepo';
import Swal from 'sweetalert2';

export const useReservation = () => {
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة تحويل الوقت (HH:mm:ss) لدقائق عشان نعرف نقارن (مهمة جداً)
  // مثال: 01:30 -> 90 دقيقة
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // --- الدالة الرئيسية: البحث عن ترابيزة ---
  const checkAvailability = async (date, time, guests) => {
    setLoading(true);
    setAvailableTables([]);

    try {
      // 1. هات الترابيزات اللي سعتها مناسبة
      // (ممكن نفلترها في الفرونت او الباك، هنا هنجيب الكل ونفلتر فرونت للسهولة)
      const tablesRes = await tableRepo.getAll(); 
      const allTables = tablesRes.data.data || [];

      // فلتر الترابيزات حسب السعة (Capacity)
      const suitableTables = allTables.filter(t => {
        const capacity = t.capacity || t.attributes?.capacity;
        return capacity >= guests;
      });

      if (suitableTables.length === 0) {
        setLoading(false);
        return Swal.fire('Sorry', 'No tables found for this number of guests', 'info');
      }

      // 2. هات الحجوزات الموجودة في التاريخ ده
      const reservationsRes = await reservationRepo.getByDate(date);
      const daysReservations = reservationsRes.data.data || [];

      // 3. معادلة "تداخل الوقت" (The Time Overlap Logic)
      // احنا اتفقنا مدة الحجز ساعة واحدة (60 دقيقة)
      const DURATION = 60; 
      const reqStart = timeToMinutes(time); 
      const reqEnd = reqStart + DURATION;

      // هنلف على الترابيزات المناسبة ونشوف مين فيهم "فاضية"
      const freeTables = suitableTables.filter(table => {
        const tableId = table.documentId || table.id;

        // هات الحجوزات اللي معمولة على الترابيزة دي بس
        const tableReservations = daysReservations.filter(res => {
          const resTable = res.table || res.attributes?.table?.data;
          // تأكد من هيكلة Strapi response عشان توصل للـ ID صح
          return (resTable?.documentId === tableId || resTable?.id === tableId);
        });

        // هل فيه أي حجز بيتعارض مع الوقت اللي احنا عايزينه؟
        const hasConflict = tableReservations.some(res => {
          const resStart = timeToMinutes(res.start_time || res.attributes?.start_time);
          const resEnd = timeToMinutes(res.end_time || res.attributes?.end_time);

          // معادلة التعارض الشهيرة:
          // (StartA < EndB) && (EndA > StartB)
          return (reqStart < resEnd) && (reqEnd > resStart);
        });

        // رجع الترابيزة لو مفيش تعارض
        return !hasConflict; 
      });

      setAvailableTables(freeTables);

    } catch (error) {
      console.error("Check Availability Error:", error);
      Swal.fire('Error', 'Failed to check availability', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    availableTables,
    loading,
    checkAvailability
  };
};