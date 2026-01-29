import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://82.112.241.233:2010',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://82.112.241.233:2010',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});