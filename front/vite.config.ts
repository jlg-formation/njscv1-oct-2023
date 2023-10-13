import { defineConfig } from "vite";

const port = +(process.env.GESTION_STOCK_PORT || 3000);
console.log("port: ", port);

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${port}`,
        secure: false,
      },
    },
  },
});
