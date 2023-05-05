import { generate, hexToRgb } from "@yy/utils";

interface Opts {
  primary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  theme?: string;
  baseColor?: string;
}

const defaultOpt: Required<Opts> = {
  primary: "#1677ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f56c6c",
  info: "#909399",
  theme: "#ffffff",
  baseColor: "#000000",
};

// 文字的梯度
const textGradient = [0.88, 0.65, 0.45, 0.25];

function setProperty(key: string, value: string) {
  document.documentElement.style.setProperty(`--y-color-${key}`, value);
}

export function useTheme(opt: Opts = {}) {
  const { theme, baseColor, ...options } = Object.assign(defaultOpt, opt);
  Object.keys(options).forEach((key) => {
    // 计算颜色梯度
    generate(options[key as keyof typeof options], {
      name: key,
      theme,
      callback: setProperty,
    });
  });

  // 文字颜色的设置
  for (let i = 0; i < textGradient.length; i++) {
    const rgb = hexToRgb(baseColor);
    setProperty(`text-${i + 1}`, `rgba(${rgb.join(",")}, ${textGradient[i]})`);
  }
}
