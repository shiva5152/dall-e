import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/server": {
        target: "https://dalle-clone-backend-196n.onrender.com",
        // target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ""),
      },
    },
  },
  optimizeDeps: {
    include: ["js-cookie"],
  },
});
