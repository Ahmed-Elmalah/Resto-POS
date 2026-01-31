import React, { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "../store";

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
}) {
  const [orderType, setOrderType] = useState("takeaway");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [note, setNote] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  // Fetch Available Tables when "Hall" is selected
  useEffect(() => {
    if (isOpen && orderType === "hall") {
      axios
        .get(`${domain}/api/tables?filters[table_status][$eq]=Available`)
        .then((res) => {
          // Strapi returns data inside res.data.data
          setTables(res.data.data || []);
        })
        .catch((err) => {
          console.error("Error fetching tables:", err);
          setTables([]);
        });
    }
  }, [isOpen, orderType]);

  const change = amountPaid > 0 ? Number(amountPaid) - totalPrice : 0;
  const isSufficient = Number(amountPaid) >= totalPrice;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 font-sans text-left">
      <div className="bg-[#121212] w-full max-w-[440px] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4500]/5 blur-[100px] rounded-full" />

        <h2 className="text-xl font-black text-center text-white mb-8 tracking-widest uppercase italic border-b border-white/5 pb-5">
          Checkout <span className="text-[#ff4500]">Details</span>
        </h2>

        <div className="space-y-6">
          {/* Order Type Selection */}
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
                      ? "bg-[#ff4500] text-white shadow-lg shadow-[#ff4500]/20"
                      : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table Selection - Animated visibility */}
          {orderType === "hall" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
                Select Table
              </label>
              <div className="relative">
                <select
                  className="w-full bg-black border border-white/10 text-[#ff4500] p-4 rounded-2xl text-xs font-bold focus:border-[#ff4500] outline-none appearance-none cursor-pointer"
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                >
                  <option value="">Choose an available table...</option>
                  {tables.length > 0 ? (
                    tables.map((t) => (
                      <option
                        key={t.id}
                        value={t.id}
                        className="bg-[#121212] text-white"
                      >
                        Table Number:{" "}
                        {t?.attributes?.table_number ||
                          t?.table_number ||
                          `ID: ${t.id}`}
                      </option>
                    ))
                  ) : (
                    <option disabled>No tables available right now</option>
                  )}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
                Payment
              </label>
              <select
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-xs font-bold focus:border-[#ff4500] outline-none appearance-none cursor-pointer"
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
                type="number"
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-lg font-black focus:border-[#ff4500] outline-none transition-all placeholder:text-gray-800"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          </div>

          {/* Change Information Card */}
          <div
            className={`p-6 rounded-[2rem] border transition-all duration-700 flex justify-between items-center ${
              isSufficient
                ? "bg-[#00ff88]/5 border-[#00ff88]/20 shadow-inner"
                : "bg-red-500/5 border-red-500/20"
            }`}
          >
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Change Due
              </p>
              <div
                className={`flex items-center gap-2 ${isSufficient ? "text-[#00ff88]" : "text-red-500"}`}
              >
                <span className="material-symbols-outlined text-sm">
                  {isSufficient ? "check_circle" : "info"}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isSufficient ? "Sufficient" : "Insufficient"}
                </span>
              </div>
            </div>
            <div
              className={`text-4xl font-black tracking-tighter ${isSufficient ? "text-[#00ff88]" : "text-red-500"}`}
            >
              {change.toFixed(2)}{" "}
              <small className="text-[11px] ml-1 opacity-60">EGP</small>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
              Notes
            </label>
            <input
              type="text"
              className="w-full bg-black border border-white/5 text-white p-4 rounded-2xl text-[11px] font-medium placeholder:text-gray-800 outline-none focus:border-white/20 transition-all"
              placeholder="Add order instructions here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Modal Actions */}
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-gray-600 font-bold text-[10px] uppercase hover:text-white transition-all tracking-widest"
            >
              Discard
            </button>
            <button
              onClick={() =>
                isSufficient &&
                onConfirm({
                  order_place: orderType,
                  pay_by: paymentMethod,
                  note,
                  table: selectedTable,
                })
              }
              disabled={!isSufficient}
              className={`flex-[2] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl ${
                isSufficient
                  ? "bg-[#ff4500] text-white shadow-[#ff4500]/20 hover:bg-[#ff571a] active:scale-95"
                  : "bg-gray-900 text-gray-700 cursor-not-allowed"
              }`}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
