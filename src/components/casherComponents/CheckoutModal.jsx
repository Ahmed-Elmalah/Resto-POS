import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";
import Swal from "sweetalert2";
import { MdTableRestaurant, MdEventSeat, MdLockClock } from "react-icons/md";

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
}) {
  const [orderType, setOrderType] = useState("takeaway");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");

  // Data State
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  // Reset on Close
  useEffect(() => {
    if (!isOpen) {
      setAmountPaid("");
      setOrderType("takeaway");
      setPaymentMethod("cash");
      setSelectedTable(null);
    }
  }, [isOpen]);

  // --- 1. Fetch Data (Fixed Date Issue) ---
  useEffect(() => {
    if (isOpen && orderType === "hall") {
      const fetchData = async () => {
        try {
          const tablesRes = await axios.get(`${domain}/api/tables?populate=*`);

          const today = new Date().toLocaleDateString("en-CA");

          const resRes = await axios.get(`${domain}/api/reservations`, {
            params: {
              "filters[reservation_date][$eq]": today,
              "filters[res_status][$in]": ["confirmed", "pending"],
              populate: "table",
            },
          });

          setTables(tablesRes.data.data || []);
          setReservations(resRes.data.data || []);

        } catch (err) {
          console.error("Error fetching data", err);
        }
      };
      fetchData();
    }
  }, [isOpen, orderType]);

  // --- 2. Smart Logic (Fixed ID Comparison) ---
  const getTableStatus = (table) => {
    // A. لو هي أصلاً Busy في السيستم
    if (table.table_status === "Busy") return { status: "busy", label: "Busy" };

    // B. لو عليها حجز في خلال 90 دقيقة
    // Strapi v5 uses documentId mostly
    const tableId = table.documentId || table.id;
    const now = new Date();

    const conflictRes = reservations.find((r) => {
      // لازم نتأكد إن الحجز مرتبط بترابيزة أصلاً
      if (!r.table) return false;

      const rTableId = r.table.documentId || r.table.id;

      // مقارنة الـ IDs
      if (rTableId !== tableId) return false;

      // حساب الوقت
      const [h, m] = r.start_time.split(":"); // "14:30" -> 14, 30
      const resTime = new Date();
      resTime.setHours(h, m, 0, 0);

      // الفرق بالدقائق (إيجابي = لسه مجاش، سلبي = فات ميعاده)
      const diff = (resTime - now) / 60000;


      // الشرط:
      // 1. diff > -30: يعني مفاتش على ميعاد الحجز أكتر من 30 دقيقة (ولسه مجاش)
      // 2. diff < 90: يعني فاضل على ميعاد الحجز أقل من ساعة ونص
      return diff > -30 && diff < 90;
    });

    if (conflictRes) {
      return {
        status: "reserved",
        label: `${conflictRes.start_time.slice(0, 5)}`,
        resId: conflictRes.documentId || conflictRes.id,
      };
    }

    return { status: "available", label: "Free" };
  };

  // --- Confirm Handler ---
  const handleConfirmOrder = async () => {
    if (orderType === "hall" && !selectedTable) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a table!",
        background: "#121212",
        color: "#fff",
      });
      return;
    }

    // Check-in logic if reserved
    if (
      orderType === "hall" &&
      selectedTable?.statusInfo?.status === "reserved"
    ) {
      const result = await Swal.fire({
        title: "Table Reserved!",
        text: `This table is reserved at ${selectedTable.statusInfo.label}. Mark as Arrived?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4500",
        cancelButtonColor: "#333",
        confirmButtonText: "Yes, Check-in",
        background: "#121212",
        color: "#fff",
      });

      if (!result.isConfirmed) return;

      // Update reservation status
      try {
        await axios.put(
          `${domain}/api/reservations/${selectedTable.statusInfo.resId}`,
          {
            data: { res_status: "completed" },
          },
        );
      } catch (e) {
        console.error(e);
      }
    }

    if (isSufficient) {
      onConfirm({
        order_place: orderType,
        pay_by: paymentMethod,
        table: selectedTable
          ? selectedTable.documentId || selectedTable.id
          : null,
      });
    }
  };

  const change = amountPaid > 0 ? Number(amountPaid) - totalPrice : 0;
  const isSufficient = Number(amountPaid) >= totalPrice;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-[#000000a6] backdrop-blur-xl p-4 font-sans text-left text-white animate-in fade-in duration-200">
      <div className="bg-[#121212] w-full max-w-120 rounded-[2.5rem] px-8 py-6 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <h2 className="text-xl font-black text-center text-white mb-6 tracking-widest uppercase italic border-b border-white/5 pb-4 shrink-0">
          Checkout <span className="text-[#ff4500]">Details</span>
        </h2>

        <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
          {/* Total Amount */}
          <div className="w-full flex justify-between items-center bg-black/40 p-5 rounded-[1.8rem] border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Total Payable
              </span>
              <h1 className="text-white font-bold text-sm">Amount Due</h1>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-black text-white tracking-tighter italic">
                {Number(totalPrice).toFixed(2)}
                <small className="text-[#ff4500] text-xs ml-1 not-italic">
                  EGP
                </small>
              </h1>
            </div>
          </div>

          {/* Order Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
              Order Type
            </label>
            <div className="flex bg-black p-1.5 rounded-2xl border border-white/5 gap-2">
              {["hall", "takeaway", "delivery"].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${
                    orderType === t
                      ? "bg-[#ff4500] text-white shadow-lg shadow-[#ff4500]/20 scale-105"
                      : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table Selection Grid */}
          {orderType === "hall" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest flex justify-between">
                <span>Select Table</span>
                {selectedTable && (
                  <span className="text-[#ff4500]">
                    T-{selectedTable.table_number} Selected
                  </span>
                )}
              </label>

              <div className="bg-black/30 border border-white/5 rounded-2xl p-3 max-h-45 overflow-y-auto">
                {tables.length === 0 ? (
                  <div className="text-center py-4 text-gray-600 text-xs">
                    Loading tables...
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
                    {tables
                      .sort((a, b) => a.table_number - b.table_number)
                      .map((t) => {
                        const statusInfo = getTableStatus(t);
                        const isSelected = selectedTable?.id === t.id;

                        // Style config
                        let btnStyle =
                          "border-white/5 bg-[#1a1a1a] text-gray-400";
                        if (statusInfo.status === "available")
                          btnStyle =
                            "border-green-500/20 bg-green-500/5 text-green-500 hover:bg-green-500/10 hover:border-green-500/50";
                        if (statusInfo.status === "reserved")
                          btnStyle =
                            "border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10";
                        if (statusInfo.status === "busy")
                          btnStyle =
                            "border-red-500/20 bg-red-500/5 text-red-500 opacity-60 cursor-not-allowed";
                        if (isSelected)
                          btnStyle =
                            "bg-[#ff4500] text-white border-[#ff4500] shadow-lg shadow-[#ff4500]/20";

                        return (
                          <button
                            key={t.id}
                            disabled={statusInfo.status === "busy"}
                            onClick={() =>
                              setSelectedTable({ ...t, statusInfo })
                            }
                            className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${btnStyle}`}
                          >
                            <span className="text-lg font-black leading-none">
                              T-{t.table_number}
                            </span>
                            <span className="text-[8px] uppercase font-bold tracking-wider mt-1 opacity-80">
                              {statusInfo.label}
                            </span>
                            {statusInfo.status === "reserved" && (
                              <MdLockClock className="absolute top-1 right-1 opacity-20" />
                            )}
                            {statusInfo.status === "busy" && (
                              <MdEventSeat className="absolute top-1 right-1 opacity-20" />
                            )}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
                Payment
              </label>
              <select
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-xs font-bold outline-none focus:border-[#ff4500]/50"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="visa">Visa Card</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#ff4500] uppercase ml-2 tracking-widest">
                Amount Paid
              </label>
              <input
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-lg font-black outline-none placeholder:text-gray-800 focus:border-[#ff4500]/50"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          </div>

          {/* Change Info */}
          <div
            className={`px-6 py-4 rounded-4xl border transition-all duration-700 flex justify-between items-center ${isSufficient ? "bg-[#00ff88]/5 border-[#00ff88]/20" : "bg-red-500/5 border-red-500/20"}`}
          >
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Change Due
              </p>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isSufficient ? "text-[#00ff88]" : "text-red-500"}`}
              >
                {isSufficient ? "Sufficient" : "Insufficient"}
              </span>
            </div>
            <div
              className={`text-3xl font-black tracking-tighter ${isSufficient ? "text-[#00ff88]" : "text-red-500"}`}
            >
              {change.toFixed(2)}
              <small className="text-[11px] ml-1 opacity-60">EGP</small>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4 mt-2 border-t border-white/5 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-gray-600 font-bold text-[10px] uppercase hover:text-white transition-all tracking-widest hover:bg-white/5 rounded-xl"
          >
            Discard
          </button>
          <button
            onClick={handleConfirmOrder}
            disabled={!isSufficient}
            className={`flex-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
              isSufficient
                ? "bg-[#ff4500] text-white shadow-xl hover:bg-[#ff4500]/90 hover:scale-[1.02]"
                : "bg-gray-900 text-gray-700 cursor-not-allowed"
            }`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
