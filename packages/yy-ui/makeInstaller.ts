import type { App, Plugin } from "vue";

import { configContextKey } from "@yy/tokens";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: any) => {
    components.forEach((c) => app.use(c));

    app.provide(configContextKey, options);
  };

  return {
    install,
  };
};
