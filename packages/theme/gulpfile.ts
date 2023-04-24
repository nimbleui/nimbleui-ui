import { resolve } from "path";
import chalk from "chalk";
import { dest, parallel, series, src } from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import consola from "consola";

const projRoot = resolve(__dirname, "..", "..");

const distFolder = resolve(__dirname, "dist");
const distBundle = resolve(projRoot, "yy", "theme");

function buildThemeChalk() {
  const sass = gulpSass(dartSass);
  const noElPrefixFile = /(index|base|display)/;
  return src(resolve(__dirname, "src/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(details.stats.originalSize / 1000)} KB -> ${chalk.green(
            details.stats.minifiedSize / 1000
          )} KB`
        );
      })
    )
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `yy-${path.basename}`;
        }
      })
    )
    .pipe(dest(distFolder));
}

export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

export function copyThemeChalkSource() {
  return src(resolve(__dirname, "src/**")).pipe(dest(resolve(distBundle, "src")));
}

export const build = parallel(series(buildThemeChalk, copyThemeChalkBundle));

export default build;
