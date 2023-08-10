import { resolve } from "path";
import { fileURLToPath } from "url";

export const projRoot = resolve(fileURLToPath(import.meta.url), "..", "..", "..", "..");
export const pkgRoot = resolve(projRoot, "packages");
export const comRoot = resolve(pkgRoot, "components");
