import { resolve } from "path";
import glob from "fast-glob";
import { rollup } from "rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueMacros from "unplugin-vue-macros";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";

import { pkgRoot, excludeFiles, writeBundles, buildOutput } from "./utils.js";

const includeFilePath = ["components", "hooks", "tokens", "utils", "yy-ui"];
function filterFilePath(paths: string[]) {
  return paths.filter((path) => {
    return !!includeFilePath.find((p) => path.indexOf(`packages/${p}`) > -1);
  });
}

export const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );

  const bundle = await rollup({
    input: filterFilePath(input),
    plugins: [
      ...vueMacros.rollup({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: false,
          }),
          vueJsx: vueJsx(),
        },
      }),
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"],
      }),
      json(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: "es2018",
        loaders: {
          ".vue": "ts",
        },
      }),
    ],
    external: ["vue", "Vue"],
    treeshake: false,
  });

  await writeBundles(bundle, [
    {
      format: "esm",
      dir: resolve(buildOutput, "es"),
      preserveModules: true,
      sourcemap: true,
      entryFileNames: `[name].mjs`,
    },
    {
      format: "cjs",
      dir: resolve(buildOutput, "lib"),
      exports: "named",
      preserveModules: true,
      sourcemap: true,
      entryFileNames: `[name].js`,
    },
  ]);
};
