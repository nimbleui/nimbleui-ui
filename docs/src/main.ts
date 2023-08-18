import { createApp } from "vue";
import router from "./router";
import YYUi from "yy-ui";
import "@yy/theme/dist/index.css";

import App from "./App.vue";
import ComponentDemos from "./components/componentDemos.vue";

createApp(App)
  .use(router)
  .use(YYUi)
  .use((app) => {
    app.component("ComponentDemos", ComponentDemos);
  })
  .mount("#app");
