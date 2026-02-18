import axios from "axios";
import React, { useEffect, useState } from "react";
import { domain } from "../../../store";
import useAdminStore from "../../../store/useAdminStore";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function OrderTable() {
  const { filters, setFilters, paginationMeta, setMeta } = useAdminStore();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const queryParams = {
        populate: "*",
        sort: ["id:desc"],
        "pagination[page]": filters.page,
        "pagination[pageSize]": 10,
        filters: {},
      };
      if (filters.searchTerm) {
        queryParams["filters[$or][0][id][$contains]"] = filters.searchTerm;
        queryParams["filters[$or][1][cashier][username][$containsi]"] =
          filters.searchTerm;
      }

      if (filters.cashier !== "All") {
        queryParams["filters[cashier][username][$eq]"] = filters.cashier;
      }

      if (filters.startDate) {
        queryParams["filters[time][$gte]"] = filters.startDate.toISOString();
      }

      try {
        const res = await axios.get(`${domain}/api/orders`, {
          params: queryParams,
        });

        setData(res.data.data || []);
        setMeta(res.data.meta.pagination);
      } catch (err) {}
    };

    fetchOrders();
  }, [filters]);

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
      <table className="w-full text-center border-collapse min-w-200">
        <thead className="bg-slate-100 dark:bg-[#1c2127] text-slate-500 dark:text-[#9dabb9] text-xs uppercase font-bold">
          <tr>
            <th className="px-3 py-4 ">Order ID</th>
            <th className="px-3 py-4">Cashier Name</th>
            <th className="px-3 py-4 ">Total</th>
            <th className="px-3 py-4">Order Place</th>
            <th className="px-3 py-4">Pay By</th>
            <th className="px-2 py-4">Time & Date</th>
          </tr>
        </thead>
        <tbody className="divide-y  divide-slate-200 dark:divide-[#283039]">
          {data.map((el) => (
            <tr
              key={el.id}
              onClick={() => navigate(`/admin/orders/${el.documentId}`)}
              className="hover:bg-slate-100/50 cursor-pointer dark:hover:bg-[#283039]/20 transition-colors"
            >
              <td className="px-3 py-4 font-mono font-bold text-primary">
                #{el.id}
              </td>
              <td className="px-3 py-4">{el.cashier?.username}</td>

              <td className="px-3 py-4 font-black text-slate-900 dark:text-[#45f5a1]">
                ${el.total}
              </td>
              <td className="px-3 py-4">
                {el.order_place === "table" ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                      <span className="font-bold text-sm">
                        Table {el.table?.table_number || "Not Found"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="capitalize font-medium">
                    {el.order_place}
                  </span>
                )}
              </td>
              <td className="px-3 py-4">{el.pay_by}</td>
              <td className="px-2 py-4">{formatDateTime(el.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination*/}
      <div className="flex justify-start items-center gap-9 p-2">
        <button
          disabled={filters.page === 1}
          onClick={() => setFilters({ page: filters.page - 1 })}
          className="btn bg-[#101010] hover:bg-[#00000093] text-white border-none btn-md flex justify-center items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <GrFormPrevious size={20} /> Previous
        </button>

        <span className="font-bold text-[17px]">
          Page {filters.page} of {paginationMeta?.pageCount}
        </span>

        <button
          disabled={filters.page >= (paginationMeta?.pageCount || 1)}
          onClick={() => setFilters({ page: filters.page + 1 })}
          className="btn bg-[#1D4ED8] hover:bg-[#1e40af] text-white border-none btn-md flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          Next <MdNavigateNext size={20} />
        </button>
      </div>

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-transparent">
          <p className="text-slate-400 font-bold italic">
            No orders match your search...
          </p>
        </div>
      )}
    </div>
  );
}
