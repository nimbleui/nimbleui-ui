import path from "path";
import fs from "fs";
import { comRoot } from "../utils/path.js";

const varCase = (str) => str.replace(/-[a-z]/g, (m) => m[1].toUpperCase());

const indexTemplate = (name, _name) => {
  return `import { withInstall } from "@nimble-ui/utils";
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
  return `import { mergeCommonProp } from "@nimble-ui/utils";
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
  return `import { createNamespace } from "@nimble-ui/utils";
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
function indexAppendExport(name, force) {
  const indexPath = `${comRoot}/index.ts`;
  const data = fs.readFileSync(indexPath, { encoding: "utf-8" });
  const d = `export * from "./${name}";\n`;
  if (data.indexOf(d) === -1) {
    fs.appendFile(indexPath, d, "utf8", (e) => {
      if (e) {
        throw new Error(e);
      }
    });
  } else if (force) {
    const content = data.replace(d, "");
    fs.writeFileSync(indexPath, content);
  }
}

/**
 * 递归删除文件夹和文件
 * @param {*} folderPath 路径
 */
function deleteFolderRecursive(folderPath) {
  //判断文件夹是否存在
  if (fs.existsSync(folderPath)) {
    //读取文件夹下的文件目录，以数组形式输出
    fs.readdirSync(folderPath).forEach((file) => {
      //拼接路径
      const curPath = path.join(folderPath, file);
      //判断是不是文件夹，如果是，继续递归
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        //删除文件或文件夹
        fs.unlinkSync(curPath);
      }
    });
    //仅可用于删除空目录
    fs.rmdirSync(folderPath);
  }
}

/**
 * 创建组件模板
 * @param {*} name 组件名称
 * @param {*} options 其他参数
 */
export function createComponent(name, options) {
  const _name = varCase(name);
  const upperName = _name.replace(/^.{1}/, (m) => m.toUpperCase());
  const root = path.resolve(comRoot, name);
  const src = path.resolve(root, "src");
  const demos = path.resolve(root, "demos");
  const { force, CNName } = options;

  // 判断是否覆盖已有的组件
  if (force) {
    indexAppendExport(name, true);
    deleteFolderRecursive(root);
  }

  fs.mkdirSync(root);
  fs.mkdirSync(src);
  fs.mkdirSync(demos);

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

  fs.writeFile(`${demos}/${name}.page.md`, `# ${CNName || ""} ${_name}`, (e) => {
    if (e) {
      throw new Error(`${_name}.page.md文件失败` + e);
    }
  });

  indexAppendExport(name);
}
