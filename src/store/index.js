import { create } from "zustand";
import MenuRepo from "../customHook/MenuRepo";

// export const domain = 'http://82.112.241.233:2010';
export const domain = "";

export const useAuthuser = create((set) => ({
  user: JSON.parse(
    sessionStorage.getItem("user-info") ||
      localStorage.getItem("user-info") ||
      null,
  ),

  syncUser: () => {
    const savedUser = JSON.parse(
      sessionStorage.getItem("user-info") ||
        localStorage.getItem("user-info") ||
        null,
    );
    set({ user: savedUser });
  },
}));

export const useMenuStore = create((set , get)=>({
  products: [],
  categories: [],
  offers: [],
  isLoading: false,
  isFetched: false,
  error: null,

  fetchMenuData : async ()=>{

    if (get().isFetched) return;

    set({isLoading : true , error : null})

    try {
      
      const [productsRes , categoriesRes , offersRes] = await Promise.all([
        MenuRepo.getAllProducts(),
        MenuRepo.getAllCategories(),
        MenuRepo.getAllOffers(),
      ]);

      const rawProducts = productsRes.data.data || [];
      const rawCategories = categoriesRes.data.data || [];
      const rawOffers = offersRes.data.data || [];

      set({
        categories : rawCategories ,
        products : rawProducts,
        offers: rawOffers,
        isLoading : false , 
        isFetched : true
      })

    } catch (err) {
      console.error("Failed to fetch menu:", err);
      set({ error: err.message, isLoading: false });
    }

  },

  refreshMenu : async ()=>{
    set({isFetched : false});
    await get().fetchMenuData();
  },

  silentRefresh: async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        MenuRepo.getAllProducts(),
        MenuRepo.getAllCategories(),
      ]);

      set({
        categories: categoriesRes.data.data || [],
        products: productsRes.data.data || [],
      });
    } catch (err) {
      console.error("Silent refresh failed:", err);
    }
  }

}));