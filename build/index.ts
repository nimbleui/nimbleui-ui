import chalk from "chalk";

import { buildDeclarations, buildFullBundle, buildModules } from "./src";

const build = async () => {
  // console.log(chalk.yellow("开始执行打包。。。"));
  buildDeclarations();
};

build();
