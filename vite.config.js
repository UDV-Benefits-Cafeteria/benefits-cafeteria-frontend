import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from "vite-plugin-eslint";
import process from "process";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    build:{
      outDir: "dist"
    },
    define: {
      __API__: JSON.stringify(env.VITE_API),
      __IS_DEV__: JSON.stringify(env.VITE_IS_DEV),
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
