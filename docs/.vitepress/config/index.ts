import { defineConfig } from "vitepress"
import { sidebar } from "./sidebar"
import { nav } from "./nav"

export default defineConfig({
  title: 'YY-UI',
  description: 'YY Vue3企业级中后台组件库',
  lang: 'cn-ZH',
  base: '/',
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
  },
  markdown: {
    lineNumbers: true,
    config(md) {
    },
  },
})