import path from "path";
import { writeFile } from "fs";
import { buildOutput } from "./utils.js";

const pkg = {
  name: "@nimble-ui/vue",
  version: "0.1.2",
  description: "vue3 ui组件库",
  keywords: ["yy-ui", "vue", "vue3", "component library", "ui framework", "ui"],
  license: "MIT",
  main: "lib/yy-ui/index.js",
  module: "es/yy-ui/index.mjs",
  types: "types/index.d.ts",
  homepage: "https://nimbleui.github.io/docs/",
  bugs: {
    url: "https://github.com/nimbleui/nimbleui-ui/issues",
  },
  repository: {
    type: "git",
    url: "git+https://github.com/nimbleui/nimbleui-ui",
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

export function createPackage() {
  return new Promise((resolve, reject) => {
    writeFile(path.resolve(buildOutput, "package.json"), JSON.stringify(pkg, null, 2), (err) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}
