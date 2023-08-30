import hljs from "highlight.js";
import { Renderer } from "marked";

export default function createRenderer() {
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const isLanguageValid = !!(language && hljs.getLanguage(language));
    if (!isLanguageValid) {
      throw new Error(`错误：${language}是无效的代码 -- ${code}`);
    }
    const highlighted = hljs.highlight(code, { language }).value;

    return highlighted;
  };

  renderer.heading = (text, level) => {
    return `<h${level} class="md-head md-head-${level}">${text}</h${level}>`;
  };

  renderer.paragraph = (text) => {
    return `<p class="md-p">${text}</p>`;
  };

  return renderer;
}
