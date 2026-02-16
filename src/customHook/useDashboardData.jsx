import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { domain } from "../store";

export const useDashboardData = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${domain}/api/orders?populate=*&sort=id:desc`);
            setAllOrders(response.data.data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); 
        return () => clearInterval(interval);
    }, []);

    const results = useMemo(() => {
    // 1. تاريخ جهازك الحالي في مصر (هيطلع 2026-02-16)
    const egyptTime = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Africa/Cairo',
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());

    const todayOrders = allOrders.filter(order => {
        // 2. تحويل تاريخ الأوردر ليوم فقط (بدون ساعات) لتجنب فرق التوقيت
        // السطر ده هو اللي هيخلي أوردرات الساعة 10 بالليل تختفي أول ما تيجي 12
        const orderDate = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Africa/Cairo',
            year: 'numeric', month: '2-digit', day: '2-digit',
        }).format(new Date(order.createdAt));
        
        return orderDate === egyptTime;
    });

    const revenue = todayOrders.reduce((sum, ord) => sum + Number(ord.total || 0), 0);

    return {
        processedOrders: todayOrders,
        stats: { 
            revenue: revenue.toLocaleString(), 
            count: todayOrders.length 
        }
    };
}, [allOrders]);

    // تأكد من إرجاع stats لتجنب إيرور undefined اللي في الصورة
    return { ...results, loading }; 
};