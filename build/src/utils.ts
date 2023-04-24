import path from "node:path";
import type { OutputOptions, RollupBuild } from "rollup";

export const projRoot = path.resolve(__dirname, "..", "..");
export const buildOutput = path.resolve(projRoot, "dist");
export const pkgRoot = path.resolve(projRoot, "packages");

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export const excludeFiles = (files: string[]) => {
  const excludes = ["node_modules", "test", "mock", "dist"];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};
