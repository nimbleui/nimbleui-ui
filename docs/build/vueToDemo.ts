import { type Token, marked } from "marked";
import createRenderer from "./mdRenderer";

const mdRenderer = createRenderer();
const template = `<template>
  <component-demo
    code="<!--CODE_SLOT-->"
  >
    <template #head>
      <!--HEAD_SLOT-->
    </template>
    <template #content>
      <!--CONTENT_SLOT-->
    </template>
    <template #demo>
      <!--DEMO_SLOT-->
    </template>
  </component-demo>
</template>

<!--SCRIPT_SLOT-->

<!--STYLE_SLOT-->
`;

interface Options {
  title: string;
  style: string;
  script: string;
  template: string;
  content: string;
  languageType: string;
  apiType: string;
  language: string;
}

function genVueComponent(content: Options) {
  const titleReg = /<!--HEAD_SLOT-->/g;
  const contentReg = /<!--CONTENT_SLOT-->/;
  const scriptReg = /<!--SCRIPT_SLOT-->/;
  const styleReg = /<!--STYLE_SLOT-->/;
  const demoReg = /<!--DEMO_SLOT-->/;
  const codeReg = /<!--CODE_SLOT-->/;

  let src = template;
  let code = "";

  if (content.content) {
    src = src.replace(contentReg, content.content);
  }
  if (content.title) {
    src = src.replace(titleReg, content.title);
  }

  if (content.template) {
    code += `<template>${content.template}</template>\n\n`;
    src = src.replace(demoReg, content.template);
  }

  if (content.script) {
    const attributes = `${content.apiType === "composition" ? " setup" : ""}${
      content.languageType === "ts" ? ' lang="ts"' : ""
    }`;
    const script = `<script${attributes}>
${content.script}
</script>\n`;
    code += script;
    src = src.replace(scriptReg, script);
  }

  if (content.style) {
    const style = `<style scoped lang="scss">
${content.style}
</style>`;
    code += `\n${style}`;
    src = src.replace(styleReg, style);
  }

  if (code) {
    src = src.replace(codeReg, encodeURIComponent(code));
  }

  return src.trim();
}

function handleCode(content: string) {
  const firstIndex = content.indexOf("<template>");
  const lastIndex = content.lastIndexOf("</template>");
  // 获取模板的DOM元素
  const template = content.slice(firstIndex + 10, lastIndex);
  // 获取模板的脚本
  const script = content?.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/)?.[1]?.trim();
  // 获取模板的样式
  const style = content?.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/)?.[1];
  const markdownText = content?.match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]?.trim();
  const tokens = marked.lexer(markdownText);
  const contentTokens: Token[] = [];
  let title = "";
  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 1) {
      title = token.text;
    } else {
      contentTokens.push(token);
    }
  }

  const scriptAttributes = content.match(/<script([\s\S]*?)>[\s\S]*?<\/script>/)?.[1].trim();
  const languageType = scriptAttributes?.includes('lang="ts"') ? "ts" : "js";
  const apiType = scriptAttributes?.includes("setup") ? "composition" : "options";

  const styleAttributes = content.match(/<style([\s\S]*?)>[\s\S]*?<\/style>/)?.[1].trim();
  const language = styleAttributes?.includes('lang="scss"') ? "scss" : "";

  return {
    title,
    style,
    script,
    apiType,
    template,
    language,
    languageType,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer,
    }),
  };
}

export function vueToDemo(content: string) {
  const code = handleCode(content);
  const component = genVueComponent(code);

  return component;
}
