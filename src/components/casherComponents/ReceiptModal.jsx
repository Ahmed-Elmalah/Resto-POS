import React from "react";

export default function ReceiptModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  const now = new Date();
  const dateString = now.toLocaleDateString("en-GB");
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono">
      <div className="bg-white text-black w-full max-w-[320px] rounded-sm p-6 shadow-2xl relative">
        <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            RestoPOS
          </h2>
          <p className="text-[10px] text-gray-500 uppercase mt-1">
            Smart POS Terminal
          </p>
        </div>

        <div className="space-y-1 mb-4 text-[11px] font-bold uppercase">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{dateString}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{timeString}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="text-[#ff4500]">{order.order_place}</span>
          </div>
          {order.table && (
            <div className="flex justify-between">
              <span>Table:</span>
              <span>{order.table}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Pay:</span>
            <span>{order.pay_by}</span>
          </div>
        </div>

        <table className="w-full text-[11px] mb-4">
          <thead className="border-y border-black">
            <tr>
              <th className="text-left py-1">ITEM</th>
              <th className="text-center py-1">QTY</th>
              <th className="text-right py-1">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.Items.map((item, i) => (
              <tr key={i}>
                <td className="py-2 capitalize">{item.product_name}</td>
                <td className="py-2 text-center">x{item.quantity}</td>
                <td className="py-2 text-right">
                  {(item.unit_price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t-2 border-black pt-3">
          <div className="flex justify-between text-base font-black uppercase">
            <span>Grand Total</span>
            <span>{order.total.toFixed(2)} EGP</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg font-black text-xs uppercase tracking-widest no-print"
        >
          Close & Print
        </button>
      </div>
    </div>
  );
}
