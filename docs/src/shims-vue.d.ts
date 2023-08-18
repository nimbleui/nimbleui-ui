/* eslint-disable @typescript-eslint/ban-types */
declare module "*.vue" {
  import type { App, DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any> & {
    install(app: App): void;
  };
  export default component;
}

declare module "*.md" {
  export default any;
}
