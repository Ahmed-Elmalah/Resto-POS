import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
}) {
  const [orderType, setOrderType] = useState("takeaway");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAmountPaid("");
      setOrderType("takeaway");
      setPaymentMethod("cash");
      setSelectedTable("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && orderType === "table") {
      axios
        .get(`${domain}/api/tables?filters[table_status][$eq]=Available`)
        .then((res) => {
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#000000a6] backdrop-blur-xl p-4 font-sans text-left text-white">
      <div className="bg-[#121212] w-full max-w-[440px] rounded-[2.5rem] px-8 py-6 border border-white/10 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-black text-center text-white mb-8 tracking-widest uppercase italic border-b border-white/5 pb-5">
          Checkout <span className="text-[#ff4500]">Details</span>
        </h2>

        <div className="space-y-3">
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

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
              Order Type
            </label>
            <div className="flex bg-black p-2 rounded-2xl border border-white/5 gap-2">
              {["table", "takeaway", "delivery"].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${
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

          {orderType === "table" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
                Select Table
              </label>
              <select
                className="w-full bg-black border border-white/10 text-[#ff4500] p-5 rounded-2xl text-xs font-bold outline-none appearance-none cursor-pointer"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              >
                <option value="">Choose an available table...</option>
                {tables.map((t) => (
                  <option
                    key={t.id}
                    value={t.documentId}
                    className="bg-[#121212] text-white"
                  >
                    Table:
                    {t?.attributes?.table_number || t?.table_number || t.id}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">
                Payment
              </label>
              <select
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-xs font-bold outline-none"
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
                className="w-full bg-black border border-white/10 text-white p-4 rounded-2xl text-lg font-black outline-none placeholder:text-gray-800"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`px-6 py-5 rounded-[2rem] border transition-all duration-700 flex justify-between items-center ${isSufficient ? "bg-[#00ff88]/5 border-[#00ff88]/20" : "bg-red-500/5 border-red-500/20"}`}
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
              className={`text-4xl font-black tracking-tighter ${isSufficient ? "text-[#00ff88]" : "text-red-500"}`}
            >
              {change.toFixed(2)}
              <small className="text-[11px] ml-1 opacity-60">EGP</small>
            </div>
          </div>

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
                  table: selectedTable || null,
                  amount_paid: Number(amountPaid),
                })
              }
              disabled={!isSufficient}
              className={`flex-[2] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isSufficient ? "bg-[#ff4500] text-white shadow-xl" : "bg-gray-900 text-gray-700 cursor-not-allowed"}`}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
