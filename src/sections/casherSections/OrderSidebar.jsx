import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useOrderStore from "../../store/useOrderStore";
import { domain } from "../../store";
import CheckoutModal from "../../components/CheckoutModal";

export default function OrderSidebar() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFinalConfirm = async (checkoutData) => {
    const loading = toast.loading("Processing Order...");
    const token =
      localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const payload = {
      data: {
        cashier: user?.id,
        total: Number(total),
        pay_by: checkoutData.pay_by,
        order_place: checkoutData.order_place,
        table: checkoutData.table || null, // الترابيزة هنا
        note: checkoutData.note || "",
        time: new Date().toISOString(), // دمج التاريخ والوقت
        Items: cart.map((item) => ({
          product_name: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      },
    };

    try {
      await axios.post(`${domain}/api/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.dismiss(loading);
      clearCart();
      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        background: "#121212",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      toast.dismiss(loading);
      console.error("Error:", err.response?.data);
      toast.error("Format Error: Check Strapi Fields");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] border-l border-white/5 w-[360px] fixed right-0 top-0 z-[100] shadow-2xl">
      <div className="p-5 border-b border-white/5 bg-[#121212] flex justify-between items-center">
        <h2 className="font-black text-white text-lg tracking-tighter uppercase italic">
          Cart <span className="text-[#ff4500]">Summary</span>
        </h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-gray-600 hover:text-red-500 transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              delete_sweep
            </span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-40">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-[#161616] p-4 rounded-2xl border border-white/[0.02]"
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-[13px] text-gray-200 leading-tight w-[65%]">
                {item.name}
              </h4>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-700 hover:text-red-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#ff4500] font-black text-xs">
                {item.price} EGP
              </span>
              <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 text-gray-500"
                >
                  -
                </button>
                <span className="w-6 text-center text-[11px] font-black text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 text-[#ff4500]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-[#121212] p-6 border-t border-white/5">
        <div className="flex justify-between items-center mb-6 px-1">
          <span className="text-gray-500 text-[10px] font-black uppercase">
            Total
          </span>
          <span className="text-2xl font-black text-white tracking-tighter">
            {total.toFixed(2)}{" "}
            <small className="text-[10px] text-[#ff4500]">EGP</small>
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={cart.length === 0}
          className="w-full bg-[#ff4500] text-white font-black py-5 rounded-[1.2rem] shadow-lg shadow-[#ff4500]/10 active:scale-95 transition-all uppercase text-[10px] tracking-widest"
        >
          Confirm Order
        </button>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinalConfirm}
        totalPrice={total}
      />
    </div>
  );
}
