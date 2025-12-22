import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BACKEND_URL,
          // localhost - for local dev
          // backend or other name - is the name of the backend service in docker-compose
          changeOrigin: true,
        },
      },
    },
  };
});
