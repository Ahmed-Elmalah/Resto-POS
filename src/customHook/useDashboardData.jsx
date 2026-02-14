import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { domain } from "../store"; // تأكد من المسار الصحيح للـ store

export const useDashboardData = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch data from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${domain}/api/orders?populate=*`);
      setAllOrders(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 120000); // Auto-refresh 2min
    return () => clearInterval(interval);
  }, []);

  // 2. Logic: Filter and Calculate Stats
  const dashboardResults = useMemo(() => {
    const todayLocal = new Date().toLocaleDateString('en-CA'); 

    const todayOrders = allOrders.filter(order => {
      const orderDateLocal = new Date(order.createdAt).toLocaleDateString('en-CA');
      return orderDateLocal === todayLocal;
    });

    const totalRevenue = todayOrders.reduce((sum, order) => {
      return sum + Number(order.total || 0);
    }, 0);

    return {
      todayOrders,
      stats: {
        revenue: totalRevenue.toLocaleString(),
        count: todayOrders.length
      }
    };
  }, [allOrders]);

  return {
    ...dashboardResults,
    loading,
    error,
    refreshData: fetchOrders
  };
};