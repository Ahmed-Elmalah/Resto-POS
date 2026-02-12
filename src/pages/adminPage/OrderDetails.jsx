import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowLeft, HiOutlinePrinter } from "react-icons/hi2";
import { domain } from "../../store";
import OrderMeta from "../../components/adminComponents/Orders/OrderMeta";
import OrderItems from "../../components/adminComponents/Orders/OrderItems";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${domain}/api/orders/${orderId}?populate[table][fields][0]=table_number&populate[cashier][fields][0]=username&populate[items]=*`,
      )
      .then((res) => {
        setOrder(res.data.data);
      })
  }, [orderId]);

  if (!order)
    return (
      <div className="p-20 text-center font-black animate-pulse uppercase tracking-widest">
        Loading...
      </div>
    );

  return (
    <div className="max-w-275 h-fit lg:h-dvh mx-auto p-4 md:p-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-black text-xs uppercase italic tracking-tighter"
        >
          <div className="size-8 rounded-full border border-slate-200 dark:border-[#283039] flex items-center justify-center group-hover:border-primary transition-colors">
            <HiOutlineArrowLeft />
          </div>
          Back to history
        </button>

        <div className="flex gap-3">
          <button className="p-3 rounded-xl bg-slate-100 dark:bg-[#283039] text-slate-500 hover:bg-slate-200 dark:hover:bg-[#323c47] transition-all">
            <HiOutlinePrinter size={22} />
          </button>
          <div className="px-6 py-3 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/25 flex items-center gap-2 uppercase italic tracking-tighter">
            Order #{order.id}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <OrderItems order={order} />
        </div>
        <div className="lg:col-span-4">
          <OrderMeta order={order} />
        </div>
      </div>
    </div>
  );
}
