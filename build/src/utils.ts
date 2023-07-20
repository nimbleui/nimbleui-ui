import { resolve } from "node:path";
import type { OutputOptions, RollupBuild } from "rollup";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

export const projRoot = resolve(fileURLToPath(import.meta.url), "..", "..", "..", "..");
export const buildOutput = resolve(projRoot, "dist");
export const pkgRoot = resolve(projRoot, "packages");

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export const excludeFiles = (files: string[]) => {
  const excludes = ["node_modules", "test", "mock", "dist"];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};

export function removeBuildFile() {
  fsExtra.removeSync(buildOutput);
}
