
// داتا وهمية (Placeholder)
const recentOrders = [
  { id: "#ORD-0245", status: "New", table: "Table 4", items: "3 Items", amount: "$45.00" },
  { id: "#ORD-0244", status: "Cooking", table: "Table 8", items: "5 Items", amount: "$120.50" },
  { id: "#ORD-0243", status: "Ready", table: "Table 2", items: "2 Items", amount: "$32.00" },
  { id: "#ORD-0242", status: "Served", table: "Table 12", items: "4 Items", amount: "$88.20" },
  { id: "#ORD-0241", status: "Served", table: "Table 5", items: "1 Item", amount: "$15.00" },
];

// ألوان الحالات عشان تليق مع الثيم
const statusColors = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Cooking: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Ready: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Served: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function RecentOrdersTable() {
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
        <button className="text-sm font-medium text-primary hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase font-semibold tracking-wide">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Table</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {order.table}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {order.items}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}