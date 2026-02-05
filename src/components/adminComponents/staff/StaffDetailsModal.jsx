import { useState, useEffect } from "react";
import {
  MdClose,
  MdReceipt,
  MdEmail,
  MdPhone,
  MdBadge,
  MdAdminPanelSettings,
  MdCalendarToday,
  MdUpdate,
} from "react-icons/md";
import LoginRepo from "../../../customHook/LoginRepo";

export default function StaffDetailsModal({ isOpen, onClose, user }) {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCashier =
    user?.role?.name?.toLowerCase().includes("cash") ||
    user?.role?.name === "Casher";
  const isAdmin = user?.role?.name === "Admin";

  // --- دالة لتنسيق التاريخ بشكل شيك ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (isOpen && user && isCashier) {
      fetchCashierData();
    } else {
      setOrders([]);
      setTotalSales(0);
    }
  }, [isOpen, user]);

  const fetchCashierData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token =
        sessionStorage.getItem("jwt-token") ||
        localStorage.getItem("jwt-token");
      const response = await LoginRepo.getCashierOrders(user.id, token);

      const fetchedOrders = response.data.data;
      setOrders(fetchedOrders);
      const total = fetchedOrders.reduce(
        (sum, order) => sum + (order.total || 0),
        0,
      );
      setTotalSales(total);
    } catch (err) {
      console.error("Error loading sales:", err);
      setError("Failed to load sales data.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* --- Header --- */}
        <div
          className={`p-6 text-white bg-linear-to-r ${isAdmin ? "from-purple-700 to-indigo-700" : "from-blue-600 to-cyan-600"}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold border-2 border-white/30 shadow-lg">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold capitalize tracking-wide">
                  {user.username}
                </h3>
                <span className="inline-flex items-center gap-1 bg-black/20 px-3 py-0.5 rounded-full text-xs mt-1 backdrop-blur-sm border border-white/10">
                  {isAdmin ? <MdAdminPanelSettings /> : <MdBadge />}
                  {user.role?.name}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white bg-black/10 hover:bg-black/30 p-1.5 rounded-full transition-all hover:rotate-90"
            >
              <MdClose size={24} />
            </button>
          </div>
        </div>

        {/* --- Body --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* 1. Contact Info Section */}
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
            Personal Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {/* Email */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <MdEmail className="text-blue-500" />
                <span className="text-xs text-gray-500">Email</span>
              </div>
              <p className="text-sm font-semibold truncate dark:text-gray-200">
                {user.email}
              </p>
            </div>
            {/* Phone */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <MdPhone className="text-green-500" />
                <span className="text-xs text-gray-500">Phone</span>
              </div>
              <p className="text-sm font-semibold dark:text-gray-200">
                {user.phone_number || "N/A"}
              </p>
            </div>
          </div>

          {/* 2. System Info Section (NEW 🔥) */}
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
            System Information
          </h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Joined Date */}
            <div className="col-span-2 md:col-span-1 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center gap-2 mb-1">
                <MdCalendarToday className="text-indigo-500" />
                <span className="text-xs text-indigo-600 dark:text-indigo-300">
                  Joined Date
                </span>
              </div>
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-100">
                {formatDate(user.createdAt)}
              </p>
            </div>

            {/* Last Updated */}
            <div className="col-span-2 md:col-span-1 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30">
              <div className="flex items-center gap-2 mb-1">
                <MdUpdate className="text-orange-500" />
                <span className="text-xs text-orange-600 dark:text-orange-300">
                  Last Updated
                </span>
              </div>
              <p className="text-xs font-bold text-orange-900 dark:text-orange-100">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-700 my-4" />

          {/* 3. Role Specific Data */}
          {isCashier ? (
            <div className="animate-fadeIn">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                Sales Performance
              </h4>

              {loading ? (
                <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-300">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-xs text-gray-400">Syncing sales data...</p>
                </div>
              ) : (
                <>
                  <div className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-xl p-5 text-white mb-4 shadow-lg relative overflow-hidden">
                    {/* Decorative Circle */}
                    <div className="absolute -top-6 -right-6 size-24 bg-white/5 rounded-full blur-xl"></div>

                    <p className="text-gray-400 text-xs font-medium mb-1">
                      Total Revenue Generated
                    </p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
                      {totalSales.toLocaleString()}{" "}
                      <span className="text-sm text-gray-500">EGP</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
                      <MdReceipt size={14} /> Total Transactions:{" "}
                      {orders.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Admin Access Card
            <div className="text-center py-5 px-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30">
              <MdAdminPanelSettings
                className="mx-auto text-purple-500 mb-2 opacity-80"
                size={28}
              />
              <p className="text-purple-800 dark:text-purple-300 font-bold text-sm">
                Full System Access
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs mt-1 leading-relaxed">
                This user holds administrative privileges. They can manage
                users, products, and system settings.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
