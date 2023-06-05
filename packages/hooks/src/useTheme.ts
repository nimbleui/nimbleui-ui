import { generate, setAlphaColor, setSolidColor } from "@yy/utils";

export interface Opts {
  primary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  theme?: string;
  baseColor?: string;
  disabledOpacity?: number;
  fontSize?: number;
  fontSizeSM?: number;
  fontSizeLG?: number;
  fontSizeXL?: number;
}

const defaultOpt: Required<Opts> = {
  primary: "#1677ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f56c6c",
  info: "#909399",
  theme: "#ffffff",
  baseColor: "#000000",
  disabledOpacity: 0.5,
  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
};

// 文字的梯度
const textGradient = [0.88, 0.65, 0.45, 0.25];
// 填充色
const fillGradient = [0.15, 0.06, 0.04, 0.02];

function setProperty(key: string, value: string, isColor = true) {
  document.documentElement.style.setProperty(`--y-${isColor ? "color-" : ""}${key}`, value);
}

export function useTheme(opt: Opts = {}) {
  const { theme, baseColor, disabledOpacity, fontSize, fontSizeLG, fontSizeSM, fontSizeXL, ...options } = Object.assign(
    defaultOpt,
    opt
  );
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
    setProperty(`text-${i + 1}`, setAlphaColor(baseColor, textGradient[i]));
  }

  // 填充颜色的设置
  for (let i = 0; i < fillGradient.length; i++) {
    setProperty(`fill-${i + 1}`, setAlphaColor(baseColor, fillGradient[i]));
  }

  // 边框颜色的设置
  setProperty(`border-1`, setSolidColor(theme, 15));
  setProperty(`border-2`, setSolidColor(theme, 6));

  setProperty("theme", theme);
  setProperty("base-color", baseColor);

  // 禁用状态的样式
  setProperty("disabled-opacity", String(disabledOpacity), false);

  // 字体大小的设置
  setProperty("font-size", `${fontSize}px`, false);
  setProperty("font-size-ms", `${fontSizeSM}px`, false);
  setProperty("font-size-xl", `${fontSizeXL}px`, false);
  setProperty("font-size-lg", `${fontSizeLG}px`, false);
}
