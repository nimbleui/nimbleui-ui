import { createRouter, createWebHistory } from "vue-router";

import componentRouters from "./routers";
const router = createRouter({
  history: createWebHistory(),
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
      children: [...componentRouters, { path: "*", component: () => import("../pages/notFound.vue") }],
    },
  ],
});

export default router;
