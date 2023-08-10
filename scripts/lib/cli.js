import { Command } from "commander";

const program = new Command();

program
  .command("component <component-name>")
  .description("创建组件")
  .option("-f, --force, 是否覆盖已有的")
  .action(async (name, options) => {
    const { createComponent } = await import("./commands/create-component.js");
    return createComponent(name, options);
  });

program.parse(process.argv);
