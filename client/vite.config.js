import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/leetcode": {
          target: "https://leetcode.com",
          changeOrigin: true,
          rewrite: () => "/graphql",
          headers: {
            Referer: "https://leetcode.com",
            Origin: "https://leetcode.com",
          },
        },
        "/api/atcoder-stats": {
          target: env.VITE_ATCODER_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/atcoder-stats/, ""),
        },
      },
    },
  };
});
