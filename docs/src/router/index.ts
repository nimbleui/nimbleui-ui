import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/button",
      component: () => import("../pages/index.page.md")
    }
  ]
})

export default router
