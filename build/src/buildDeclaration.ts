import fs from "fs";
import path from "path";
import { execa } from "execa";

import { pkgRoot } from "./utils";

export async function buildDeclarations() {
  const tsConfig = path.resolve(pkgRoot, "tsconfig.type.json");
  if (fs.existsSync(tsConfig)) {
    execa("tsc", ["-p", tsConfig]);
  }
}
