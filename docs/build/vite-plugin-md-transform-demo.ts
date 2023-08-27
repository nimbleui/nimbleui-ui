import { Plugin } from "vite";
import { mdTransformVueSrs } from "./mdTransformVueSrs";

const fileRegex = /\.md$/;

export function markedTransformDemo(): Plugin {
  return {
    name: "vite-plugin-md-transform-demo",
    transform(code, id) {
      if (fileRegex.test(id)) {
        return mdTransformVueSrs(id);
      }
    },
  };
}
