import type { App, Plugin } from "vue";

import { globalConfigContextKey, GlobalConfigContext } from "@nimble-ui/tokens";
import { useTheme } from "@nimble-ui/hooks";
import type { Opts } from "@nimble-ui/hooks";

export interface OptionsProps extends GlobalConfigContext {
  theme?: Opts;
  // 是否暗黑主题
  isDark?: boolean;
}

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: OptionsProps = {}): void => {
    components.forEach((c) => app.use(c));
    const { theme, isDark, ...other } = options;
    // 设置主题颜色
    useTheme(theme, isDark ? "dark" : "light");
    // 公共参数
    app.provide(globalConfigContextKey, other);
  };

  return {
    install,
  };
};
