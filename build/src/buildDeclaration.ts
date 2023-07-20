import { existsSync } from "fs";
import { resolve } from "path";
import { execa } from "execa";

import { pkgRoot } from "./utils.js";

export async function buildDeclarations() {
  const tsConfig = resolve(pkgRoot, "tsconfig.type.json");
  if (existsSync(tsConfig)) {
    execa("tsc", ["-p", tsConfig]);
  }
}
