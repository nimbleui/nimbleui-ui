import { marked } from "marked";
import createRenderer from "./mdRenderer";

const mdRenderer = createRenderer();

function camelCase(s: string) {
  const shouldConvert = !(s.indexOf("-") === -1 && s.indexOf("_") === -1 && s.indexOf(".") === -1);
  return shouldConvert ? s.replace(/[-_.]+([^-_.])/g, (...args) => args[1].toUpperCase()) : s;
}

interface InfosType {
  id: string;
  tag: string;
  variable: string;
  fileName: string;
}
function resolveDemoInfos(text: string) {
  const ids = text
    .split("\n")
    .map((line) => line.trim())
    .filter((id) => id.length);

  const infos: InfosType[] = [];
  for (const id of ids) {
    let fileName: string;
    if (id.includes(".vue")) {
      fileName = id.slice(0, -4) + ".demo.vue";
    } else {
      fileName = `${id}.demo.md`;
    }
    const variable = `${camelCase(id)}Demo`;
    infos.push({
      id,
      variable,
      fileName,
      tag: `<${variable} />`,
    });
  }
  return infos;
}

function genScript(demoInfos: InfosType[], components = []) {
  const importStmts = demoInfos
    .map(({ variable, fileName }) => `import ${variable} from './${fileName}'`)
    .concat(components.map(({ importStmt }) => importStmt))
    .join("\n");
  return `
  <script setup>
    ${importStmts}
  </script>
  `;
}

function genDemosTemplate(demoInfos: InfosType[], span: number) {
  return `<component-demos :span="${span}">${demoInfos.map(({ tag }) => tag).join("\n")}</component-demos>`;
}

export function mdToPage(text: string) {
  const span = ~text.search("<!--single-column-->") ? 1 : 2;
  const tokens = marked.lexer(text);
  // 查找demo
  const demosIndex = tokens.findIndex((token) => token.type === "code" && token.lang === "demo");
  let demoInfos: InfosType[] = [];
  if (~demosIndex) {
    const item: any = tokens[demosIndex];
    demoInfos = resolveDemoInfos(item.text);
    tokens.splice(demosIndex, 1, {
      type: "html",
      pre: false,
      text: genDemosTemplate(demoInfos, span),
    } as any);
  }

  const template = marked.parser(tokens, {
    gfm: true,
    renderer: mdRenderer,
  });

  const docTemplate = `
<template>
  <div class="docs">
  ${template}
  </div>
</template>
`;
  const docScript = genScript(demoInfos);
  return `${docTemplate}\n\n${docScript}`;
}
