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
  const [serviceFeePercent, setServiceFeePercent] = useState(0);

  // Reset on Close
  useEffect(() => {
    if (!isOpen) {
      setAmountPaid("");
      setOrderType("takeaway");
      setPaymentMethod("cash");
      setSelectedTable(null);
    }
  }, [isOpen]);

  // --- 1. Fetch Settings (Once on Open) ---
  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${domain}/api/restaurant-setting`)
        .then((res) => {
          const data = res.data.data?.attributes || res.data.data;
          setServiceFeePercent(data?.serviceFee || 0);
        })
        .catch((err) => console.error("Settings Error:", err));
    }
  }, [isOpen]);

  // --- 2. Fetch Tables (Only if Hall) ---
  useEffect(() => {
    if (isOpen && orderType === "hall") {
      const fetchTablesData = async () => {
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
          console.error("Tables Error:", err);
        }
      };
      fetchTablesData();
    }
  }, [isOpen, orderType]);

  // --- Calculations ---
  // حساب قيمة الخدمة فقط لو النوع صالة
  const serviceAmount =
    orderType === "hall" ? (totalPrice * serviceFeePercent) / 100 : 0;
  const finalTotal = totalPrice + serviceAmount;

  const change = amountPaid > 0 ? Number(amountPaid) - finalTotal : 0;
  const isSufficient = Number(amountPaid) >= finalTotal;

  // --- Table Status Logic ---
  const getTableStatus = (table) => {
    if (table.table_status === "Busy") return { status: "busy", label: "Busy" };

    const tableId = table.documentId || table.id;
    const now = new Date();

    const conflictRes = reservations.find((r) => {
      if (!r.table) return false;
      const rTableId = r.table.documentId || r.table.id;
      if (rTableId !== tableId) return false;
      const [h, m] = r.start_time.split(":");
      const resTime = new Date();
      resTime.setHours(h, m, 0, 0);
      const diff = (resTime - now) / 60000;
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
        text: "Please select a table!", background: document.documentElement.classList.contains("dark")
          ? "#1e293b"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      });
      return;
    }

    // Check-in Logic
    if (
      orderType === "hall" &&
      selectedTable?.statusInfo?.status === "reserved"
    ) {
      const result = await Swal.fire({
        title: "Table Reserved!",
        text: `Reserved at ${selectedTable.statusInfo.label}. Mark as Arrived?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4500",
        confirmButtonText: "Yes, Check-in",
      });

      if (!result.isConfirmed) return;

      try {
        await axios.put(
          `${domain}/api/reservations/${selectedTable.statusInfo.resId}`,
          { data: { res_status: "completed" } },
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
        serviceFee: serviceAmount,
        finalTotal: finalTotal,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-xl p-4 font-sans text-left animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121212] w-full max-w-120 rounded-[2.5rem] px-8 py-6 border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <h2 className="text-xl font-black text-center text-gray-800 dark:text-white mb-6 tracking-widest uppercase italic border-b border-gray-100 dark:border-white/5 pb-4 shrink-0">
          Checkout <span className="text-[#ff4500]">Details</span>
        </h2>

        <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
          {/* Bill Breakdown */}
          <div className="bg-gray-50 dark:bg-black/40 p-5 rounded-[1.8rem] border border-gray-100 dark:border-white/5 space-y-2">
            <div className="flex justify-between text-xs text-gray-500 font-bold">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>

            {/* Show Service Fee Row only if applicable */}
            {orderType === "hall" && serviceFeePercent > 0 && (
              <div className="flex justify-between text-xs text-orange-500 font-bold">
                <span>Service Fee ({serviceFeePercent}%)</span>
                <span>+ {serviceAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-dashed border-gray-300 dark:border-gray-700 my-2"></div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                  Total Payable
                </span>
                <h1 className="text-gray-900 dark:text-white font-bold text-sm">
                  Amount Due
                </h1>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                  {Number(finalTotal).toFixed(2)}
                  <small className="text-[#ff4500] text-xs ml-1 not-italic">
                    EGP
                  </small>
                </h1>
              </div>
            </div>
          </div>

          {/* Order Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
              Order Type
            </label>
            <div className="flex bg-gray-100 dark:bg-black p-1.5 rounded-2xl border border-gray-200 dark:border-white/5 gap-2">
              {["hall", "takeaway", "delivery"].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${
                    orderType === t
                      ? "bg-[#ff4500] text-white shadow-lg shadow-[#ff4500]/20 scale-105"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table Selection Grid (Only Hall) */}
          {orderType === "hall" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest flex justify-between">
                <span>Select Table</span>
                {selectedTable && (
                  <span className="text-[#ff4500]">
                    T-{selectedTable.table_number} Selected
                  </span>
                )}
              </label>

              <div className="bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-2xl p-3 max-h-45 overflow-y-auto">
                {tables.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-xs">
                    Loading tables...
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {tables
                      .sort((a, b) => a.table_number - b.table_number)
                      .map((t) => {
                        const statusInfo = getTableStatus(t);
                        const isSelected = selectedTable?.id === t.id;
                        let btnStyle =
                          "border-gray-200 dark:border-white/5 bg-white dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-400";

                        if (statusInfo.status === "available")
                          btnStyle =
                            "border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/5 text-green-600 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/10";
                        if (statusInfo.status === "reserved")
                          btnStyle =
                            "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-500/10";
                        if (statusInfo.status === "busy")
                          btnStyle =
                            "border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 text-red-500 opacity-60 cursor-not-allowed";
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
                              <MdLockClock className="absolute top-1 right-1 opacity-40" />
                            )}
                            {statusInfo.status === "busy" && (
                              <MdEventSeat className="absolute top-1 right-1 opacity-40" />
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
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
                Payment
              </label>
              <select
                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-4 rounded-2xl text-xs font-bold outline-none focus:border-[#ff4500]/50"
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
                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-4 rounded-2xl text-lg font-black outline-none placeholder:text-gray-400 focus:border-[#ff4500]/50"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          </div>

          {/* Change Info */}
          <div
            className={`px-6 py-4 rounded-4xl border transition-all duration-700 flex justify-between items-center ${
              isSufficient
                ? "bg-green-50 dark:bg-[#00ff88]/5 border-green-200 dark:border-[#00ff88]/20"
                : "bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20"
            }`}
          >
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                Change Due
              </p>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isSufficient ? "text-green-600 dark:text-[#00ff88]" : "text-red-500"}`}
              >
                {isSufficient ? "Sufficient" : "Insufficient"}
              </span>
            </div>
            <div
              className={`text-3xl font-black tracking-tighter ${isSufficient ? "text-green-600 dark:text-[#00ff88]" : "text-red-500"}`}
            >
              {change.toFixed(2)}
              <small className="text-[11px] ml-1 opacity-60">EGP</small>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4 mt-2 border-t border-gray-100 dark:border-white/5 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-gray-500 dark:text-gray-600 font-bold text-[10px] uppercase hover:text-gray-900 dark:hover:text-white transition-all tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl"
          >
            Discard
          </button>
          <button
            onClick={handleConfirmOrder}
            disabled={!isSufficient}
            className={`flex-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
              isSufficient
                ? "bg-[#ff4500] text-white shadow-xl hover:bg-[#ff4500]/90 hover:scale-[1.02]"
                : "bg-gray-200 dark:bg-gray-900 text-gray-400 dark:text-gray-700 cursor-not-allowed"
            }`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
