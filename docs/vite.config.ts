import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { markedTransformDemo } from "./build/vite-plugin-md-transform-demo";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    markedTransformDemo(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
  ],
  server: {
    host: "0.0.0.0",
  },
});
