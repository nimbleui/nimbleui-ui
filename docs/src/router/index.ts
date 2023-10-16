import { createRouter, createWebHashHistory } from "vue-router";

import componentRouters from "./routers";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../pages/home.vue"),
    },
    {
      path: "/component/",
      name: "componentLayout",
      component: () => import("../components/ComponentLayout.vue"),
      children: [...componentRouters],
    },
  ],
});

export default router;
