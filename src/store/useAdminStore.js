import { create } from 'zustand';

const useAdminStore = create((set) => ({
  orders: [],
  filters: { status: 'All', dateRange: 'Last 30 Days' },
  
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),

  // هنا ممكن تربط مع API مستقبلاً
  fetchOrders: async () => {
    // const res = await axios.get('/api/orders');
    // set({ orders: res.data });
  }
}));

export default useAdminStore;