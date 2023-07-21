import { copyFile } from "fs/promises";
import path from "path";

import { pkgRoot, buildOutput } from "./utils.js";

export async function copyFiles() {
  console.log(path.resolve(pkgRoot, "yy-ui", "README.md"));
  await copyFile(path.resolve(pkgRoot, "yy-ui", "README.md"), path.resolve(buildOutput, "README.md"));
}
