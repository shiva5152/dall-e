import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/abc": {
        target: "https://dalle-clone-backend-196n.onrender.com",
        // target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abc/, ""),
      },
    },
  },
  optimizeDeps: {
    include: ["js-cookie"],
  },
});
