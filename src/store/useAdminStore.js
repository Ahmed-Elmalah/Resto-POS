import axios from "axios";
import { create } from "zustand";
import {domain} from '../store'

const useAdminStore = create((set) => ({
  orders: [],
  filters: {
    status: "All",
    dateRange: "Last 30 Days",
    searchTerm: "",
    cashier: "All",
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSearchTerm: (term) =>
    set((state) => ({
      filters: { ...state.filters, searchTerm: term },
    })),

  offers: [],
  isLoadingOffers: false,

  // --- Fetch Offers ---
  fetchOffers: async () => {
    set({ isLoadingOffers: true });
    try {
      // Get offers with image and products populated
      const res = await axios.get(`${domain}/api/offers?populate=*`);
      set({ offers: res.data.data, isLoadingOffers: false });
    } catch (error) {
      console.error("Error fetching offers:", error);
      set({ isLoadingOffers: false });
    }
  },

  // --- 1. Upload Image Function ---
  uploadFile: async (file) => {
    // Create FormData to send file
    const formData = new FormData();
    formData.append("files", file);

    try {
      // Send file to Strapi upload endpoint
      const res = await axios.post(`${domain}/api/upload`, formData);
      return res.data[0]; // Return the uploaded image data (we need the ID)
    } catch (error) {
      console.error("Upload Error:", error);
      throw error;
    }
  },

  // --- 2. Create Offer Function ---
  createOffer: async (offerData) => {
    try {
      // Wrap data in 'data' object as Strapi expects
      const payload = { data: offerData };
      const res = await axios.post(`${domain}/api/offers`, payload);
      
      // Update local state with new offer
      set((state) => ({ offers: [...state.offers, res.data.data] }));
      return { success: true };
    } catch (error) {
      console.error("Create Offer Error:", error);
      return { success: false, error: error.response?.data || error.message };
    }
  },
}));

export default useAdminStore;
