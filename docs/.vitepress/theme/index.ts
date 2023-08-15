import { Theme } from 'vitepress'
import YUI from "yy-ui"
import VPApp from "../../vitepress/index"
import "@yy/theme"

const theme: Theme = {
  Layout: VPApp,
  enhanceApp ({ app }) {
    app.use(YUI, {
      theme: {
        primary: '#1677ff'
      }
    })
  }
}
export default theme
