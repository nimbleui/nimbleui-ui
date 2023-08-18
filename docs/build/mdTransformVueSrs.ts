import fs from "fs"
import { mdToPage } from "./mdToPage"

export function mdTransformVueSrs(path: string) {
  if (path.endsWith('.md')) {
    const code = fs.readFileSync(path, {encoding: "utf-8"})
    return mdToPage(code, path)
  }
}