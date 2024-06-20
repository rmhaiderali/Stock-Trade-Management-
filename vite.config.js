import "dotenv/config.js";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

function useExpressInVite(entry) {
  return {
    name: "expressAppMiddleware",
    configureServer: async (server) => {
      async function expressAppMiddleware(req, res, next) {
        const app = await server.ssrLoadModule(entry);
        app.default(req, res, next);
      }

      server.middlewares.use(expressAppMiddleware);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: process.env.PORT || 3000 },
  plugins: [useExpressInVite("/src/backend/app.js"), react()],
});
