import { resolve } from "path";

import { rollup } from "rollup";
import dts from "rollup-plugin-dts";

import { pkgRoot, buildOutput } from "./utils.js";

export async function buildDeclarations() {
  const tsConfig = resolve(pkgRoot, "tsconfig.type.json");
  const input = resolve(pkgRoot, "yy-ui/index.ts");

  const bundle = await rollup({
    input,
    plugins: [
      dts({
        tsconfig: tsConfig,
      }),
    ],
  });
  await bundle.write({
    format: "esm",
    dir: resolve(buildOutput, "types"),
    sourcemap: false,
  });
}
