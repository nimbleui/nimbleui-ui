const pkg = {
  name: "yy-ui",
  version: "0.0.1",
  description: "vue3 ui组件库",
  keywords: ["yy-ui", "vue", "vue3", "component library", "ui framework", "ui"],
  license: "MIT",
  main: "lib/yy-ui/index.js",
  module: "es/yy-ui/index.mjs",
  types: "types/yy-ui/index.d.ts",
  homepage: "https://yy-ui.org/",
  bugs: {
    url: "https://github.com/yy-ui/issues",
  },
  repository: {
    type: "git",
    url: "git+https://github.com/yy-ui/yy-ui.git",
  },
  unpkg: "index.full.js",
  jsdelivr: "index.full.js",
  publishConfig: {
    access: "public",
  },
  style: "index.css",
  peerDependencies: {
    vue: "^3.2.0",
  },
};
