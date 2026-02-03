import axios from "axios";
import React, { useEffect, useState } from "react";
import { domain } from "../../../store";
import useAdminStore from "../../../store/useAdminStore";
import { useNavigate } from "react-router-dom";

export default function OrderTable() {
  const { filters, setFilters } = useAdminStore();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${domain}/api/orders?populate=*`).then((res) => {
      const orders = res.data.data || [];
      const sorted = orders.sort((a, b) => b.id - a.id);
      setData(sorted);

      const uniqueCashiers = [
        ...new Set(
          orders.map((order) => order.cashier?.username).filter(Boolean),
        ),
      ];
      setFilters({ allCashiers: uniqueCashiers });
    });
  }, []);

  const filteredData = data.filter((el) => {
    const search = filters.searchTerm.toLowerCase();

    const matchesCashier =
      !filters.cashier ||
      filters.cashier === "All" ||
      el.cashier?.username === filters.cashier;

    const orderDate = new Date(el.time).toDateString();
    const today = new Date().toDateString();
    const matchesDate =
      filters.dateRange === "All" ||
      filters.dateRange === "Last 30 Days" ||
      (filters.dateRange === "Today" && orderDate === today);

    const matchesSearch =
      el.id.toString().includes(search) ||
      (el.cashier?.username || "").toLowerCase().includes(search);

    return matchesSearch && matchesCashier && matchesDate;
  });

  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);

    // 1. تنسيق الوقت (مثلاً 03:21 PM)
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // 2. تنسيق التاريخ (مثلاً 02 Feb 2026)
    const datePart = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return (
      <div className="flex flex-col items-center">
        <span className="font-bold text-slate-700 dark:text-white">
          {timePart}
        </span>
        <span className="text-[10px] text-slate-400 uppercase">{datePart}</span>
      </div>
    );
  };
  return (
    <div className="w-full overflow-auto max-h-500 no-scrollbar">
      <table className="w-full  text-center border-collapse min-w-[800px]">
        <thead className="bg-slate-100 dark:bg-[#1c2127] text-slate-500 dark:text-[#9dabb9] text-xs uppercase font-bold">
          <tr>
            <th className="px-6 py-4 ">Order ID</th>
            <th className="px-6 py-4">Cashier Name</th>
            <th className="px-6 py-4 ">Total</th>
            <th className="px-6 py-4">Order Place</th>
            <th className="px-6 py-4">Pay By</th>
            <th className="px-1 py-4">Time & Date</th>
          </tr>
        </thead>
        <tbody className="divide-y  divide-slate-200 dark:divide-[#283039]">
          {filteredData.map((el) => (
            <tr
              key={el.id}
              onDoubleClick={() => navigate(`/admin/orders/${el.documentId}`)}
              className="hover:bg-slate-100/50 cursor-pointer dark:hover:bg-[#283039]/20 transition-colors"
            >
              <td className="px-6 py-4 font-mono font-bold text-primary">
                #{el.id}
              </td>
              <td className="px-6 py-4">{el.cashier?.username}</td>

              <td className="px-6 py-4 font-black text-slate-900 dark:text-[#45f5a1]">
                ${el.total}
              </td>
              <td className="px-6 py-4">{el.order_place}</td>
              <td className="px-6 py-4">{el.pay_by}</td>
              <td className="px-6 py-4">{formatDateTime(el.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-transparent">
          <p className="text-slate-400 font-bold italic">
            No orders match your search...
          </p>
        </div>
      )}
    </div>
  );
}
