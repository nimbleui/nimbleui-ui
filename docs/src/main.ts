import { createApp } from "vue";
import router from "./router";
import YYUi from "@nimble-ui/vue";
import "@nimble-ui/theme/dist/index.css";
import "highlight.js/styles/atom-one-dark.css";

import App from "./App.vue";
import ComponentDemo from "./components/ComponentDemo.vue";
import ComponentDemos from "./components/ComponentDemos";

createApp(App)
  .use(YYUi)
  .use(router)
  .use((app) => {
    app.component("ComponentDemo", ComponentDemo);
    app.component("ComponentDemos", ComponentDemos);
  })
  .mount("#app");
