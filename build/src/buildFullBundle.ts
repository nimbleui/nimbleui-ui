import { rollup, Plugin } from "rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import path from "path";
import { buildOutput, writeBundles } from "./utils";

const banner = `/*! YyUi v1.0.0 */\n`;

export const buildFullBundle = async (minify: boolean) => {
  const plugins: Plugin[] = [
    ...VueMacros.rollup({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: vue({
          isProduction: true,
        }),
        vueJsx: vueJsx(),
      },
    }),
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".ts"],
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target: "es2018",
      loaders: {
        ".vue": "ts",
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      treeShaking: true,
      legalComments: "eof",
    }),
  ];
  if (minify) {
    plugins.push(
      minifyPlugin({
        target: "es2018",
        sourceMap: true,
      })
    );
  }

  const bundle = await rollup({
    input: path.resolve(__dirname, "index.ts"),
    plugins,
    external: ["vue"],
    treeshake: true,
  });

  await writeBundles(bundle, [
    {
      format: "umd",
      file: path.resolve(buildOutput, `index.full${minify ? ".min" : ""}.js`),
      exports: "named",
      name: "YyUi",
      globals: {
        vue: "Vue",
      },
      sourcemap: minify,
      banner,
    },
    {
      format: "esm",
      file: path.resolve(buildOutput, `index.full${minify ? ".min" : ""}.mjs`),
      sourcemap: minify,
      banner,
    },
  ]);
};
