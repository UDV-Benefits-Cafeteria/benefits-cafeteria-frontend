import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import process from "process";
import { defineConfig, loadEnv } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    build: {
      outDir: "dist",
    },
    define: {
      __API__: JSON.stringify(env.VITE_API),
      __IS_DEV__: JSON.stringify(env.VITE_IS_DEV),
    },
    plugins: [react(), tsconfigPaths(), babel()],
    server: {
      host: true,
      port: 5000,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
