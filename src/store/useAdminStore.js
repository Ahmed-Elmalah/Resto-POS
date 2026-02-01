import { create } from "zustand";

const useAdminStore = create((set) => ({
  orders: [],
  filters: { status: "All", dateRange: "Last 30 Days" },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  fetchOrders: async () => {},
}));

export default useAdminStore;
