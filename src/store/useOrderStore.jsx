import { create } from "zustand";
import axios from "axios";
import { domain } from "./index";

const useOrderStore = create((set, get) => ({
  // 3. إضافة get هنا عشان نعرف نقرأ الكارت
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  updateQuantity: (id, amount) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // --- التغييرات الجديدة من هنا ---

  // 4. ميثود لمسح الكارت بالكامل
  clearCart: () => set({ cart: [] }),

  // 5. ميثود إرسال الأوردر لسترابي
  submitOrder: async (orderDetails) => {
    try {
      const currentCart = get().cart;
      const payload = {
        data: {
          items: currentCart.map((item) => ({
            product_name: item.name,
            unit_price: Number(item.price),
            quantity: Number(item.quantity),
          })),
          total: Number(
            currentCart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0,
            ),
          ),
          pay_by: orderDetails.pay_by,
          order_place: orderDetails.order_place,
          note: orderDetails.note || "",

          // الحقول اللي طلبتها
          cashier: orderDetails.cashier, // الـ ID رقم 4 هيتبعت هنا
          time: orderDetails.time, // الوقت والتاريخ

          table: orderDetails.table ? { id: orderDetails.table } : null,
        },
      };

      console.log("Final Payload to Strapi:", payload); // لمتابعة الـ Cashier في الكونسول

      const response = await axios.post(`${domain}/api/orders`, payload);
      if (response.status === 200 || response.status === 201) {
        set({ cart: [] });
        return { success: true };
      }
    } catch (error) {
      console.error("Strapi Error:", error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  },
}));

export default useOrderStore;
