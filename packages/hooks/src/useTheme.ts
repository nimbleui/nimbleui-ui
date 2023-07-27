import { generate, setAlphaColor, setSolidColor } from "@yy/utils";

export interface Opts {
  primary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  disabledOpacity?: number;
  fontSize?: number;
  fontSizeSM?: number;
  fontSizeLG?: number;
  fontSizeXL?: number;
  bgBaseColor?: string;
  colorTextBase?: string;
}

interface GradientTypes {
  [key: string]: [number, number];
}

type ThemeType = "dark" | "light";

const defaultOpt: Required<Omit<Opts, "bgBaseColor" | "colorTextBase">> = {
  primary: "#1677ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f56c6c",
  info: "#909399",
  disabledOpacity: 0.5,
  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
};

// 文字
const textGradient: GradientTypes = {
  text: [0.88, 0.85],
  secondary: [0.65, 0.65],
  tertiary: [0.45, 0.45],
  quaternary: [0.25, 0.25],
};
// 填充
const fillGradient: GradientTypes = {
  fill: [0.15, 0.18],
  secondary: [0.06, 0.12],
  tertiary: [0.04, 0.08],
  quaternary: [0.02, 0.04],
};
// 边框
const borderGradient: GradientTypes = {
  border: [15, 26],
  secondary: [6, 19],
};
// 背景
const bgGradient: GradientTypes = {
  elevated: [0, 12],
  container: [0, 8],
  layout: [0, 0],
  spotlight: [0.85, 26],
};

function setGradient(gradient: GradientTypes, theme: ThemeType, callback: (name: string, value: number) => void) {
  const index = theme === "light" ? 0 : 1;
  for (const key of Object.keys(gradient)) {
    callback(key, gradient[key][index]);
  }
}

function createStyleElement() {
  let style = document.getElementById("y-style-root");
  if (!style) {
    style = document.createElement("style");
    style.id = "y-style-root";
    style.setAttribute("type", "text/css");
    document.head.appendChild(style);
  }
  return {
    style,
    styleKeyValue: [] as string[],
  };
}

export function useTheme(opt: Opts = {}, theme: ThemeType = "light") {
  const { bgBaseColor, colorTextBase, disabledOpacity, fontSize, fontSizeLG, fontSizeSM, fontSizeXL, ...options } =
    Object.assign(defaultOpt, opt);

  const textColor = colorTextBase || (theme === "light" ? "#000" : "#fff");
  const bgColor = bgBaseColor || (theme === "light" ? "#fff" : "#000");

  const { style, styleKeyValue } = createStyleElement();
  Object.keys(options).forEach((key) => {
    // 计算颜色梯度
    generate(options[key as keyof typeof options], {
      name: key,
      theme: bgColor,
      callback: (key: string, value: string) => {
        styleKeyValue.push(`--y-color-${key}: ${value}`);
      },
    });
  });

  // 文字颜色的设置
  setGradient(textGradient, theme, (name: string, val: number) => {
    const n = name == "text" ? "text" : `text-${name}`;
    styleKeyValue.push(`--y-color-${n}: ${setAlphaColor(textColor, val)}`);
  });

  // 填充颜色的设置
  setGradient(fillGradient, theme, (name: string, val: number) => {
    const n = name == "fill" ? "fill" : `fill-${name}`;
    styleKeyValue.push(`--y-color-${n}: ${setAlphaColor(textColor, val)}`);
  });

  // 边框颜色的设置
  setGradient(borderGradient, theme, (name: string, val: number) => {
    const n = name == "border" ? "border" : `border-${name}`;
    styleKeyValue.push(`--y-color-${n}: ${setSolidColor(bgColor, val, theme)}`);
  });

  // 设置背景色
  setGradient(bgGradient, theme, (name: string, val: number) => {
    styleKeyValue.push(`--y-color-bg-${name}: ${setSolidColor(bgColor, val, theme)}`);
  });

  styleKeyValue.push(`--y-color-theme: ${bgColor}`);
  styleKeyValue.push(`--y-base-color: ${textColor}`);

  // 禁用状态的样式
  styleKeyValue.push(`--y-disabled-opacity: ${disabledOpacity}`);

  // 字体大小的设置
  styleKeyValue.push(`--y-font-size: ${fontSize}px`);
  styleKeyValue.push(`--y-font-size-ms: ${fontSizeSM}px`);
  styleKeyValue.push(`--y-font-size-xl: ${fontSizeXL}px`);
  styleKeyValue.push(`--y-font-size-lg: ${fontSizeLG}px`);

  styleKeyValue.push(`--y-height-l: 40px`);
  styleKeyValue.push(`--y-height-m: 32px`);
  styleKeyValue.push(`--y-height-s: 24px`);

  style.innerHTML = `:root{${styleKeyValue.join(";")}}`;
}
