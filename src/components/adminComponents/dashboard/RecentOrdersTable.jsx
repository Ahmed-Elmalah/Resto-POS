import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../../customHook/useDashboardData'; 

export default function RecentOrdersTable() {
    // Get filtered data from hook
    const { processedOrders, loading } = useDashboardData(); 
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    // Pagination logic
    const totalPages = Math.ceil(processedOrders.length / ordersPerPage);
    const currentOrders = processedOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    // Navigate to details using Strapi documentId
    const handleRowClick = (docId) => {
        if (docId) navigate(`/admin/orders/${docId}`);
    };

    // Format time specifically for Cairo
    const formatTime = (isoString) => {
        if (!isoString) return "--:--";
        return new Date(isoString).toLocaleTimeString('en-US', {
            timeZone: 'Africa/Cairo',
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true
        });
    };

    if (loading && processedOrders.length === 0) {
        return <div className="p-10 text-center dark:text-white font-bold">LOADING...</div>;
    }

    return (
        <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden">
            
            {/* Header section */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold dark:text-white uppercase tracking-tight">Today's Orders</h3>
                    <p className="text-[10px] text-blue-500 uppercase font-black">Cairo Timezone</p>
                </div>
                
                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1 disabled:opacity-20 dark:text-white">
                            <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                        </button>
                        <span className="text-xs font-bold dark:text-white px-1 font-mono">{currentPage} / {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1 disabled:opacity-20 dark:text-white">
                            <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] text-slate-500 uppercase font-black border-b dark:border-slate-800">
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Service</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {currentOrders.map((order) => {
                            const isCash = String(order.pay_by).toLowerCase() === 'cash';
                            const orderPlace = String(order.order_place).toLowerCase();
                            const docId = order.documentId; // Use documentId for routing

                            return (
                                <tr 
                                    key={order.id} 
                                    onClick={() => handleRowClick(docId)} 
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer text-sm transition-colors"
                                >
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">#ORD-{order.id}</td>
                                    <td className="px-6 py-4 dark:text-slate-300 font-bold">
                                        {/* Service type logic */}
                                        {orderPlace === 'table' ? (
                                            <span className="text-blue-500">🍽️ Table {order.table?.table_number || 'N/A'}</span>
                                        ) : orderPlace === 'delivery' ? (
                                            <span className="text-orange-500">🛵 Delivery</span>
                                        ) : (
                                            <span className="opacity-80">🛍️ Takeaway</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black ${isCash ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'}`}>
                                            {isCash ? 'CASH' : 'VISA'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{formatTime(order.createdAt)}</td>
                                    <td className="px-6 py-4 text-right font-black dark:text-white">{order.total} EGP</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                {/* Auto-clear message at 12:00 AM */}
                {processedOrders.length === 0 && !loading && (
                    <div className="p-20 text-center text-slate-400 italic font-bold uppercase tracking-widest">
                        No orders found for today.
                    </div>
                )}
            </div>
        </div>
    );
}