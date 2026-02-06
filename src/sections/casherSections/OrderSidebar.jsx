import React, { useState } from "react";
import useOrderStore from "../../store/useOrderStore";
import { domain, useAuthuser } from "../../store";
import CheckoutModal from "../../components/casherComponents/CheckoutModal";
import Swal from "sweetalert2";
import {
  HiOutlinePlusSm,
  HiOutlineMinusSm,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { MdOutlineShoppingBasket, MdDeleteSweep } from "react-icons/md";
import axios from "axios";

export default function OrderSidebar() {
  const { cart, updateQuantity, removeFromCart, clearCart, submitOrder } =
    useOrderStore();
  const { user } = useAuthuser();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [note, setNote] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async (orderDetails) => {
    Swal.fire({
      title: "Processing...",
      html: "Saving your order to the system",
      allowOutsideClick: false,
      showConfirmButton: false,
      background: "#1a1a1a",
      color: "#fff",
      didOpen: () => {
        Swal.showLoading();
        const loader = Swal.getHtmlContainer().querySelector(".swal2-loader");
        if (loader)
          loader.style.borderColor = "#f97316 transparent #f97316 transparent";
      },
    });

    const finalOrderDetails = {
      ...orderDetails,
      note: note,
      table: orderDetails.table,
      cashier: user?.documentId || user?.id,
      time: new Date().toISOString(),
    };
    console.log("🚀 Payload being sent to Strapi:", finalOrderDetails);
    const result = await submitOrder(finalOrderDetails);

    if (result.success) {
      if (
        finalOrderDetails.order_place === "table" &&
        finalOrderDetails.table
      ) {
        try {
          await axios.put(`${domain}/api/tables/${finalOrderDetails.table}`, {
            data: { table_status: "Busy" },
          });
          console.log("Table is now Busy");
        } catch (err) {
          console.error("Failed to update table status:", err);
        }
      }
      setIsCheckoutOpen(false);
      setNote("");
      Swal.fire({
        icon: "success",
        title: '<span style="color: #fff;">Order Confirmed!</span>',
        background: "#1a1a1a",
        iconColor: "green",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: '<span style="color: #fff;">Error</span>',
        text: result.error,
        background: "#1a1a1a",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-card-dark transition-colors font-sans">
      {/* هيدر السايدبار */}
      <div className="py-6 px-4 border-b border-gray-100 dark:border-border-dark flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase italic">
            Order <span className="text-primary">Details</span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {cart.length} Items Selected
          </span>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <MdDeleteSweep className="text-xl" />
            <span className="text-[10px] font-black uppercase">Clear All</span>
          </button>
        )}
      </div>

      {/* منطقة المنتجات */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-gray-50 dark:bg-background-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-end gap-1.5">
                <h4 className="font-bold text-2xl text-gray-900 dark:text-white line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-primary font-black text-xs">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <MdDeleteSweep className="text-2xl" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="size-8 flex items-center justify-center bg-gray-200 dark:bg-[#1a1a1a] rounded-lg dark:text-white"
                >
                  <HiOutlineMinusSm />
                </button>
                <span className="text-sm font-bold w-6 text-center dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="size-8 flex items-center justify-center bg-primary text-white rounded-lg"
                >
                  <HiOutlinePlusSm />
                </button>
              </div>
              <span className="text-sm font-black text-gray-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* فوتر السايدبار */}
      <div className="p-5 border-t dark:border-border-dark bg-gray-50/50 dark:bg-background-dark/30">
        <div className="mb-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
            Order Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Special instructions..."
            className="w-full mt-1 px-4 py-3 bg-white dark:bg-[#1a1a1a] border dark:border-white/5 rounded-2xl text-xs font-bold dark:text-white outline-none focus:border-primary transition-all resize-none h-15 shadow-sm"
          />
        </div>
        <div className="flex justify-between items-end mb-6">
          <span className="text-gray-500 dark:text-text-muted font-bold text-sm uppercase">
            Total Amount
          </span>
          <span className="text-3xl font-black text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => cart.length > 0 && setIsCheckoutOpen(true)}
          disabled={cart.length === 0}
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <HiOutlineCreditCard className="text-xl" />
          Place Order
        </button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmOrder}
        totalPrice={total}
      />
    </div>
  );
}
