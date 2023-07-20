import chalk from "chalk";
import { buildDeclarations, buildModules, buildFullBundle, buildStyle, copyFullStyle } from "./src/index.js";
import { removeBuildFile } from "./src/utils.js";

const build = async () => {
  removeBuildFile();
  console.log(chalk.yellow("开始执行打包..."));

  console.log(chalk.yellow("开始打包声明文件..."));
  await buildDeclarations();
  console.log(chalk.yellow("结束打包声明文件..."));

  console.log(chalk.yellow("开始打包压缩文件..."));
  await buildFullBundle(false);
  console.log(chalk.yellow("结束打包压缩文件..."));

  console.log(chalk.yellow("开始打包es、commonjs模块..."));
  await buildModules();
  console.log(chalk.yellow("结束打包es、commonjs模块..."));

  console.log(chalk.yellow("开始样式..."));
  await buildStyle();
  console.log(chalk.yellow("结束打包样式..."));

  console.log(chalk.yellow("开始克隆样式..."));
  await copyFullStyle();
  console.log(chalk.yellow("结束克隆样式..."));
};

build();
