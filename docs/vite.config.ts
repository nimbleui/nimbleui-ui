import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";

export default defineConfig({
  plugins: [
    VueMacros.vite({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vueJsx: vueJsx(),
      },
    }),
  ],
  server: {
    port: 3100,
  },
});
