import path from "path";
import { exec } from "child_process";
import { copyFile, mkdir } from "fs/promises";

import { buildOutput, pkgRoot } from "./utils.js";

export function buildStyle() {
  return new Promise((resolve, reject) => {
    exec("npm run build", { cwd: path.resolve(pkgRoot, "theme") }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

export async function copyFullStyle() {
  await mkdir(path.resolve(buildOutput), { recursive: true });
  await copyFile(path.resolve(pkgRoot, "theme/dist/index.css"), path.resolve(buildOutput, "index.css"));
}
