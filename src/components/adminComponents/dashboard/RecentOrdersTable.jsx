import React, { useState } from 'react';

const statusColors = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Cooking: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Ready: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Served: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function RecentOrdersTable({ orders = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // 1. دالة تنسيق الوقت (خرجناها بره الـ map)
  const formatOrderTime = (timeStr) => {
    if (!timeStr) return "--:--";
    try {
      const [hours, minutes] = timeStr.split(':');
      let h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${minutes} ${ampm}`;
    } catch (error) {
      return timeStr;
    }
  };

  // 2. ترتيب من الأحدث للأقدم
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  // 3. حسابات الترقيم
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
        <div className="flex gap-2">
          {totalPages > 1 && (
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 disabled:opacity-30 text-slate-500 dark:text-slate-400 hover:text-blue-600"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <span className="text-[11px] font-bold px-2 text-slate-600 dark:text-slate-400">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 disabled:opacity-30 text-slate-500 dark:text-slate-400 hover:text-blue-600"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase font-semibold tracking-wide">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Table / Note</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => {
                const data = order.attributes || order;
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      #ORD-{order.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[data.order_status] || statusColors.New}`}>
                        {data.order_status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {data.order_place === 'takeaway' ? `Note: ${data.note || 'N/A'}` : `Table: ${data.table?.data?.attributes?.table_number || 'N/A'}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {/* ناديت على الدالة وبعت ليها الوقت فعلاً */}
                      {formatOrderTime(data.time)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">
                      {data.total} EGP
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}