import { create } from "zustand";

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