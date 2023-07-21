<h1 align="center">@nimble-ui/vue</h1>
<p align="center">一个 Vue 3 组件库</p>
<p align="center"><b>比较完整，主题可调，组件灵活，使用 TypeScript 开发</b></p>

### 使用 TypeScript

@nimble-ui/vue 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接。

### npm

使用 npm 安装。

```bash
npm i -D @nimble-ui/vue
```

### 使用

```ts
import YYUi from "@nimble-ui/vue";
import "@nimble-ui/vue/index.css";

createApp(App).use(YYUi, {
  isDark: true, // 开启暗黑主题
  theme: {
    primary: "#1677ff" // 修改主色调
    // ...
  }
})
```