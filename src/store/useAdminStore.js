import axios from "axios";
import { create } from "zustand";
import { domain } from "../store";

const useAdminStore = create((set , get) => ({
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
  products: [],
  isLoadingOffers: false,

  currentOffer: null,
  isLoadingCurrentOffer: false,

  fetchOffers: async () => {
    set({ isLoadingOffers: true });

    const token = localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");

    try {
      const res = await axios.get(`${domain}/api/offers?populate=*`);
      
      const fetchedOffers = res.data.data; 

      const getLocalDateString = () => {
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        return new Date(d.getTime() - offset).toISOString().split('T')[0];
      };

      const todayStr = getLocalDateString();

      const updatedOffersPromises = fetchedOffers.map(async (offer) => {
        
        if (!offer.expiryDate) return offer;
        const isExpired = offer.expiryDate <= todayStr;

        if (isExpired && offer.isAvailable) {
          console.log(`🚨 Expiring: ${offer.name} (${offer.expiryDate})`);

          if (token) {
            try {
              await axios.put(
                `${domain}/api/offers/${offer.documentId}`,
                { data: { isAvailable: false } },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              console.log("✅ DB Updated");
            } catch (err) {
              console.error("❌ DB Update Failed:", err.message);
            }
          }

          return { ...offer, isAvailable: false };
        }

        return offer;
      });

      const finalOffers = await Promise.all(updatedOffersPromises);

      set({ offers: finalOffers, isLoadingOffers: false });
    } catch (error) {
      console.error("❌ Error:", error);
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
    // 1. Validation: Check if Expiry Date is missing
    if (!offerData.expiryDate) {
      return { success: false, error: { message: "Expiry Date is required! Please select a date." } };
    }

    // 2. Validation: Check for Duplicate Name
    const isDuplicate = get().offers.some(
      (offer) => offer.name.trim().toLowerCase() === offerData.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      return { success: false, error: { message: "An offer with this name already exists!" } };
    }

    try {
      // Wrap data in 'data' object as Strapi expects
      const payload = { data: offerData };
      const res = await axios.post(`${domain}/api/offers`, payload);

      // Update local state with new offer
      set((state) => ({ offers: [...state.offers, res.data.data] }));
      return { success: true };
    } catch (error) {
      console.error("Create Offer Error:", error);
      // Return the error message from Strapi or a generic one
      return { success: false, error: error.response?.data?.error || error.message };
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

  toggleItemAvailability: async (id, currentStatus, type = "product") => {
    const endpoint = type === "offer" 
      ? `${domain}/api/offers/${id}` 
      : `${domain}/api/products/${id}`;


    const fieldName = "isAvailable" ; 

    try {
      await axios.put(endpoint, {
        data: {
          [fieldName]: !currentStatus
        }
      });
      
      set((state) => {
        if (type === "offer") {
            return {
                offers: state.offers.map(o => 
                    o.documentId === id ? { ...o, [fieldName]: !currentStatus } : o
                )
            };
        } else {
            if (!state.products) return state;

            return {
                products: state.products.map(p => 
                    p.documentId === id ? { ...p, [fieldName]: !currentStatus } : p
                )
            };
        }
      });
      
      return { success: true };
    } catch (error) {
      console.error(`Error toggling ${type}:`, error);
      return { success: false, error: error.message };
    }
  },
}));

export default useAdminStore;
