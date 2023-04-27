import { Theme } from 'vitepress'
import YUI from "yy-ui"
import VPApp from "../../vitepress/index"

const theme: Theme = {
  Layout: VPApp,
  enhanceApp ({ app }) {
    app.use(YUI)
  }
}
export default theme
