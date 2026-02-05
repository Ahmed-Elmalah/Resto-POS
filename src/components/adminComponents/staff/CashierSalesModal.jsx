import { useState, useEffect } from "react";
import { MdClose, MdAttachMoney, MdReceipt } from "react-icons/md";

// 1. هنستورد الملف اللي فيه الدالة بتاعتك (غالباً LoginRepo أو ApiService حسب ما إنت مسميه)
import LoginRepo from "../../../customHook/LoginRepo"; 

export default function CashierSalesModal({ isOpen, onClose, cashierId }) {
  // --- States ---
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Effect: Fetch Data when Modal Opens ---
  useEffect(() => {
    if (isOpen && cashierId) {
      fetchCashierData();
    }
  }, [isOpen, cashierId]);

  // --- Helper: Fetch Logic ---
  const fetchCashierData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');

      const response = await LoginRepo.getCashierOrders(cashierId, token);

      // Strapi Response handling
      const fetchedOrders = response.data.data;
      setOrders(fetchedOrders);

      // Calculate Total Sum
      const total = fetchedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      setTotalSales(total);

    } catch (err) {
      console.error("Error loading sales:", err);
      setError("Failed to load sales data.");
    } finally {
      setLoading(false);
    }
  };

  // If modal is closed, return nothing
  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <MdAttachMoney className="text-green-500" size={24} />
            Cashier Sales Report
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <MdClose size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-gray-500">Calculating sales...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg">{error}</div>
          ) : (
            <>
              {/* Total Summary Card */}
              <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white mb-6 shadow-lg">
                <p className="text-blue-100 text-sm font-medium mb-1">Total Cash in Hand</p>
                <p className="text-3xl font-bold">{totalSales.toLocaleString()} EGP</p>
                <p className="text-blue-200 text-xs mt-2 flex items-center gap-1">
                   <MdReceipt /> Based on {orders.length} orders
                </p>
              </div>

              {/* Orders List */}
              <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Recent Transactions</h4>
              {orders.length > 0 ? (
                <div className="space-y-2">
                  {orders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Order #{order.id}</span>
                      <span className="font-bold text-gray-800 dark:text-white">{order.total} EGP</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">No orders found for this cashier.</p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}