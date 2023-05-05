import { generate } from "@yy/utils";

interface Opts {
  primary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  theme?: string;
}

const defaultOpt: Required<Opts> = {
  primary: "#1677ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f56c6c",
  info: "#909399",
  theme: "#ffffff",
};

export function useTheme(opt: Opts = {}) {
  const { theme, ...options } = Object.assign(defaultOpt, opt);
  Object.keys(options).forEach((key) => {
    generate(options[key as keyof typeof options], {
      name: key,
      theme,
      callback(key, value) {
        document.documentElement.style.setProperty(`--y-color-${key}`, value);
      },
    });
  });
}
