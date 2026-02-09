import axios from "axios";
import { create } from "zustand";
import { domain } from "../store";

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

  currentOffer: null,
  isLoadingCurrentOffer: false,

  fetchOffers: async () => {
    set({ isLoadingOffers: true });
    try {
      const res = await axios.get(`${domain}/api/offers?populate=*`);
      set({ offers: res.data.data, isLoadingOffers: false });
    } catch (error) {
      console.error("Error fetching offers:", error);
      set({ isLoadingOffers: false });
    }
  },

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

  deleteOffer: async (documentId) => {
    try {
      await axios.delete(`${domain}/api/offers/${documentId}`);

      // Remove from local state immediately (Optimistic UI)
      set((state) => ({
        offers: state.offers.filter((offer) => offer.documentId !== documentId),
      }));
      return { success: true };
    } catch (error) {
      console.error("Delete Error:", error);
      return { success: false, error: error.message };
    }
  },

  updateOffer: async (documentId, updatedData) => {
    try {
      // Strapi expects data wrapped in 'data' object
      const res = await axios.put(`${domain}/api/offers/${documentId}`, {
        data: updatedData,
      });

      // Update the specific offer in the local list
      set((state) => ({
        offers: state.offers.map((offer) =>
          offer.documentId === documentId ? res.data.data : offer,
        ),
      }));

      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("Update Error:", error);
      return { success: false, error: error.message };
    }
  },

  getOfferById: async (documentId) => {
    set({ isLoadingCurrentOffer: true, currentOffer: null });
    try {
      const res = await axios.get(
        `${domain}/api/offers/${documentId}?populate[image][fields]=url&populate[offerItems][populate][product][fields]=name,price,documentId`
      );

      set({
        currentOffer: res.data.data,
        isLoadingCurrentOffer: false,
      });
      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("Get Offer Error:", error);
      set({ isLoadingCurrentOffer: false });
      return { success: false, error: error.message };
    }
  },
}));

export default useAdminStore;
