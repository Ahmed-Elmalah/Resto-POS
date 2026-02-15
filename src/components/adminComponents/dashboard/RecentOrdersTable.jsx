import React, { useState } from 'react';
import { useDashboardData } from '../../../customHook/useDashboardData'; 

export default function RecentOrdersTable() {
    const { processedOrders, loading } = useDashboardData(); 
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    const totalPages = Math.ceil(processedOrders.length / ordersPerPage);
    const currentOrders = processedOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

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
        return <div className="p-10 text-center dark:text-white font-bold">LOADING DATA...</div>;
    }

    return (
        <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden">
            
            {/* Table Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold dark:text-white">TODAY'S ORDERS</h3>
                    <p className="text-[10px] text-blue-500 uppercase tracking-widest font-black">Cairo Timezone</p>
                </div>
                
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => setCurrentPage(p => p - 1)} 
                            className="p-1 disabled:opacity-20 dark:text-white"
                        >
                            <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                        </button>
                        <span className="text-xs font-bold dark:text-white px-1">{currentPage} / {totalPages}</span>
                        <button 
                            disabled={currentPage === totalPages} 
                            onClick={() => setCurrentPage(p => p + 1)} 
                            className="p-1 disabled:opacity-20 dark:text-white"
                        >
                            <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] text-slate-500 uppercase font-black border-b dark:border-slate-800">
                            <th className="px-6 py-4">ORDER ID</th>
                            <th className="px-6 py-4">SERVICE</th>
                            <th className="px-6 py-4">PAYMENT</th>
                            <th className="px-6 py-4">TIME</th>
                            <th className="px-6 py-4 text-right">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                        {currentOrders.map((order) => {
                            const isCash = String(order.pay_by).toLowerCase() === 'cash';
                            const orderPlace = String(order.order_place).toLowerCase();

                            return (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 text-sm transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">#ORD-{order.id}</td>
                                    <td className="px-6 py-4 dark:text-slate-300">
                                        {orderPlace === 'table' ? (
                                            <span className="text-blue-500 font-bold">🍽️ TABLE {order.table?.table_number || 'N/A'}</span>
                                        ) : orderPlace === 'delivery' ? (
                                            <span className="text-orange-500 font-bold">🛵 DELIVERY</span>
                                        ) : (
                                            <span className="opacity-80 font-bold">🛍️ TAKEAWAY</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black ${isCash ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'}`}>
                                            {isCash ? 'CASH' : 'VISA'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{formatTime(order.createdAt)}</td>
                                    <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white text-base">{order.total} EGP</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                {/* Empty State */}
                {processedOrders.length === 0 && !loading && (
                    <div className="p-20 text-center text-slate-400 italic font-bold uppercase tracking-widest">
                        No orders found for today.
                    </div>
                )}
            </div>
        </div>
    );
}