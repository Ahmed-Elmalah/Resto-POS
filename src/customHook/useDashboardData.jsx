import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { domain } from "../store";

export const useDashboardData = (currentPage = 1, ordersPerPage = 6) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${domain}/api/orders?populate=*&sort=id:desc`,
      );
      setAllOrders(response.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const results = useMemo(() => {
    // 1. Get current date in Cairo
    const egyptTime = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    // 2. Filter orders for today only
    const todayOrders = allOrders.filter((order) => {
      const orderDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Cairo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(order.createdAt));
      return orderDate === egyptTime;
    });

    // 3. Calculate Revenue
    const revenue = todayOrders.reduce(
      (sum, ord) => sum + Number(ord.total || 0),
      0,
    );

    // 4. Pagination logic moved here
    const totalPages = Math.ceil(todayOrders.length / ordersPerPage);
    const currentOrders = todayOrders.slice(
      (currentPage - 1) * ordersPerPage,
      currentPage * ordersPerPage,
    );

    return {
      processedOrders: todayOrders, // Full list for today
      currentOrders, // Paginated list for table
      totalPages,
      stats: {
        revenue: revenue.toLocaleString(),
        count: todayOrders.length,
      },
    };
  }, [allOrders, currentPage, ordersPerPage]);

  // Helper to format time in Cairo
  const formatCairoTime = (isoString) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString("en-US", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return { ...results, loading, formatCairoTime };
};
