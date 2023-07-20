import { buildDeclarations, buildModules, buildFullBundle } from "./src/index.js";

const build = async () => {
  // console.log(chalk.yellow("开始执行打包。。。"));
  buildDeclarations();
  buildFullBundle(false);
  buildModules();
};

build();
