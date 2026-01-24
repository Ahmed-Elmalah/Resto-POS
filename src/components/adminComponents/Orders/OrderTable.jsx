import React from 'react';

export default function OrderTable() {
  // Mock Data
  const data = [
    { id: "#ORD-8821", date: "Oct 24, 2023", table: "T-12", total: 45.50, status: "Completed" },
    { id: "#ORD-8818", date: "Oct 24, 2023", table: "T-02", total: 12.50, status: "Refunded" },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <table className="w-full text-left border-collapse min-w-[800px]">
        {/* Table Head */}
        <thead className="bg-slate-100 dark:bg-[#1c2127] text-slate-500 dark:text-[#9dabb9] text-xs uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Table</th>
            <th className="px-6 py-4 text-right">Total</th>
            <th className="px-6 py-4 text-center">Status</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="divide-y divide-slate-200 dark:divide-[#283039]">
          {data.map((order) => (
            <tr key={order.id} className="hover:bg-slate-100/50 dark:hover:bg-[#283039]/20 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-primary">{order.id}</td>
              <td className="px-6 py-4"><span className="bg-slate-200 dark:bg-[#283039] px-2 py-1 rounded text-xs">{order.table}</span></td>
              <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-[#45f5a1]">${order.total}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                  order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}