import fs from "fs";
import { mdToPage } from "./mdToPage";

export function mdTransformVueSrs(path: string) {
  if (path.endsWith(".md")) {
    const code = fs.readFileSync(path, { encoding: "utf-8" });
    return mdToPage(code, path);
  } else if (path.endsWith(".demo.vue")) {
    const code = fs.readFileSync(path, "utf-8");
    console.log(code);
  }
}
