import { create } from "zustand";
import axios from "axios";
import { domain } from "./index";

const useOrderStore = create((set, get) => ({
  // --- State Variables ---
  cart: [], // Stores items added to the cart

  // --- Actions ---

  // 1. Add Item to Cart (Handles both Products & Offers)
  addToCart: (itemToAdd) =>
    set((state) => {
      // Normalize 'isOffer' flag to boolean (false if undefined) to ensure strict comparison
      const isOffer = itemToAdd.isOffer || false;

      // Check if the item already exists in the cart by matching both ID and Type (Offer vs Product)
      // This prevents merging a Product with ID=5 and an Offer with ID=5
      const existing = state.cart.find(
        (cartItem) => 
          cartItem.id === itemToAdd.id && 
          (cartItem.isOffer || false) === isOffer
      );

      // If item exists, just increment its quantity
      if (existing) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === itemToAdd.id && (cartItem.isOffer || false) === isOffer
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      // If item is new, add it to the cart array with quantity 1
      return { 
        cart: [...state.cart, { ...itemToAdd, quantity: 1, isOffer }] 
      };
    }),

  // 2. Update Item Quantity (Increment/Decrement)
  updateQuantity: (id, amount, isOffer = false) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        // Find the item by ID and Type, then update quantity (min: 1)
        item.id === id && (item.isOffer || false) === isOffer
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      ),
    })),

  // 3. Remove Item from Cart
  removeFromCart: (id, isOffer = false) =>
    set((state) => ({
      // Filter out the item matching the specific ID and Type
      cart: state.cart.filter((item) => !(item.id === id && (item.isOffer || false) === isOffer)),
    })),

  // 4. Clear Entire Cart
  clearCart: () => set({ cart: [] }),

  // 5. Submit Order to Backend (Strapi)
  submitOrder: async (orderDetails) => {
    try {
      // Get the current cart state
      const currentCart = get().cart;
      
      // Prepare the payload structure expected by Strapi API
      const payload = {
        data: {
          // Map cart items to the format required by 'order_items' field in database
          // Note: We send names as text because we don't track inventory strictly
          items: currentCart.map((item) => ({
            product_name: item.isOffer ? `${item.name} (Offer)` : item.name, // Append (Offer) for clarity
            unit_price: Number(item.price), // Snapshot price at time of sale
            quantity: Number(item.quantity),
          })),

          // Calculate total order value
          total: Number(
            currentCart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )
          ),

          // Add other order details from checkout modal
          pay_by: orderDetails.pay_by,
          order_place:
            orderDetails.order_place === "hall"
              ? "table"
              : orderDetails.order_place,
          note: orderDetails.note || "",
          cashier: orderDetails.cashier,
          time: orderDetails.time,
          table: orderDetails.table || null, // Table ID if order is for Hall
        },
      };

      // Send POST request to create the order
      const response = await axios.post(`${domain}/api/orders`, payload);
      
      // If order created successfully
      if (response.status === 200 || response.status === 201) {
        // If it's a table order, update table status to 'Busy'
        if (orderDetails.table) {
          await axios.put(`${domain}/api/tables/${orderDetails.table}`, {
            data: { table_status: "Busy" },
          });
        }
        
        // Clear cart after successful order and return success flag
        set({ cart: [] });
        return { success: true };
      }
    } catch (error) {
      // Log and return error message if something fails
      console.error("Strapi Error:", error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  },
}));

export default useOrderStore;