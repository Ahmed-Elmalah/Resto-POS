import React from "react";
import { FiClock, FiUser, FiMapPin, FiCreditCard } from "react-icons/fi";

export default function OrderMeta({ order = {} }) {
  const info = [
    {
      label: "Date & Time",
      val: order.time ? new Date(order.time).toLocaleString() : "N/A",
      icon: <FiClock size={20} />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Handled By",
      val: order.cashier?.username || "System Admin",
      icon: <FiUser size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Location",
      val:
        order.order_place === "table" && order.table
          ? `Table #${order.table.table_number}`
          : order.order_place === "table"
            ? "Table (Not Specified)"
            : order.order_place,
      icon: <FiMapPin size={20} />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Payment",
      val: order.pay_by || "Cash",
      icon: <FiCreditCard size={20} />,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1c2127]/60 border border-slate-200 dark:border-[#283039] rounded-4xl p-6 space-y-8 shadow-sm">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        Order Information
      </h3>

      <div className="space-y-6">
        {info.map((el, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${el.bg} ${el.color} border border-white/5 shadow-inner`}
            >
              {el.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 mb-0.5">
                {el.label}
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {el.val}
              </p>
            </div>
          </div>
        ))}
      </div>

      {order.note && (
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 italic text-[13px] font-bold dark:text-white text-black text-center">
          "{order.note}"
        </div>
      )}
    </div>
  );
}
