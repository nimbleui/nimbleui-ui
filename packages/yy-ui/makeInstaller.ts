import type { App, Plugin } from "vue";

import { configContextKey } from "@yy/tokens";
import { useTheme } from "@yy/hooks";
import type { Opts } from "@yy/hooks";

export interface OptionsProps {
  theme?: Opts;
  // 是否暗黑主题
  isDark?: boolean;
}

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: OptionsProps = {}) => {
    components.forEach((c) => app.use(c));
    const { theme, isDark, ...other } = options;
    // 设置主题颜色
    useTheme(theme, isDark ? "dark" : "light");
    // 公共参数
    app.provide(configContextKey, other);
  };

  return {
    install,
  };
};
