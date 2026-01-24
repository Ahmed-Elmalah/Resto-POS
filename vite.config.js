import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api، حوله على السيرفر ده
      '/api': {
        target: 'http://82.112.241.233:2010',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});