import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import eslint from "vite-plugin-eslint";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      __API__: JSON.stringify(process.env.VITE_API),
      __IS_DEV__: JSON.stringify(process.env.VITE_IS_DEV),
    },
    plugins: [react(), eslint()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
