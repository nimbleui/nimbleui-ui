import path from "path";
import fs from "fs";
import { comRoot } from "../utils/path.js";

const varCase = (str) => str.replace(/-[a-z]/g, (m) => m[1].toUpperCase());

const indexTemplate = (name, _name) => {
  return `import { withInstall } from "@yy/utils";
import _${name} from "./src/${name}";

export * from "./src/types";
export const Y${_name} = withInstall(_${name});
export default Y${_name};

declare module "vue" {
  export interface GlobalComponents {
    Y${_name}: typeof Y${_name};
  }
}
`;
};

const typesTemplate = (name, _name) => {
  return `import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const ${name}Props = mergeCommonProp({
  // 这是参数模板
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
});

export default ${name}Props;

// 给组件ref智能提示
export type ${name}Expose = {};

export type ${_name}Props = ExtractPropTypes<ReturnType<typeof ${name}Props>>;
`;
};

const componentTemplate = (name, _name) => {
  return `import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import ${name}Props from "./types";

export default defineComponent({
  name: "Y${_name}",
  props: ${name}Props(),
  setup(props, ctx) {
    const bem = createNamespace("${name}");

    return () => {
      return <div class={bem.b()}></div>;
    };
  },
});
`;
};

/**
 * 在index.ts页面追加组件导出
 * @param {*} name 组件文件名
 */
function indexAppendExport(name) {
  const indexPath = `${comRoot}/index.ts`;
  const data = fs.readFileSync(indexPath, { encoding: "utf-8" });
  const d = `export * from "./${name}";\n`;
  if (data.indexOf(d) === -1) {
    fs.appendFile(indexPath, d, "utf8", (e) => {
      if (e) {
        throw new Error(e);
      }
    });
  }
}

/**
 * 创建组件模板
 * @param {*} name 组件名称
 * @param {*} options 其他参数
 */
export function createComponent(name) {
  const _name = varCase(name);
  const upperName = _name.replace(/^.{1}/, (m) => m.toUpperCase());
  const root = path.resolve(comRoot, name);
  const src = path.resolve(root, "src");
  fs.mkdirSync(root);
  fs.mkdirSync(src);

  fs.writeFile(`${root}/index.ts`, indexTemplate(_name, upperName), (e) => {
    if (e) {
      throw new Error("创建index.ts文件失败" + e);
    }
  });
  fs.writeFile(`${src}/types.ts`, typesTemplate(_name, upperName), (e) => {
    if (e) {
      throw new Error("types.ts文件失败" + e);
    }
  });
  fs.writeFile(`${src}/${_name}.tsx`, componentTemplate(_name, upperName), (e) => {
    if (e) {
      throw new Error(`${_name}.tsx文件失败` + e);
    }
  });

  indexAppendExport(name);
}
