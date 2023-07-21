import { Theme } from 'vitepress'
import YUI from "yy-ui"
import VPApp from "../../vitepress/index"
import "@yy/theme"

const theme: Theme = {
  Layout: VPApp,
  enhanceApp ({ app }) {
    app.use(YUI, {
      isDark: true,
      theme: {
        primary: '#18a058'
      }
    })
  }
}
export default theme
