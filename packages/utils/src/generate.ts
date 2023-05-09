const hexReg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

type ReturnType = [number, number, number];
/**
 * RGB 转十六进制
 * @param r RGB中r
 * @param g RGB中g
 * @param b RGB中b
 * @returns
 */
function rgbToHex(r: number, g: number, b: number) {
  return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, "0")}`;
}

/**
 * 十六进制转化rgb
 * @param color 目标
 */
export function hexToRgb(color: string): ReturnType {
  if (!hexReg.test(color)) {
    throw new Error(`${color}不是真确的十六进制值`);
  }
  const result: number[] = [];
  color = color.toLowerCase();
  let resStr = color;
  if (color.length === 4) {
    resStr = "#";
    for (let i = 1; i < 4; i++) {
      resStr += color.slice(i, i + 1).concat(color.slice(i, i + 1));
    }
  }
  for (let i = 1; i <= 6; i += 2) {
    result.push(parseInt(`0x${resStr.slice(i, i + 2)}`));
  }
  return result as ReturnType;
}

/**
 * 把目标颜色转成透明度的颜色
 * @param color 目标颜色
 * @param alpha 透明度
 * @returns 返回rgba
 */
export function setAlphaColor(color: string, alpha = 1) {
  const rgb = hexToRgb(color);
  return `rgba(${rgb.join(",")},${alpha})`;
}

/**
 * 把RGB转成hsl
 * @param r RGB中r
 * @param g RGB中g
 * @param b RGB中b
 * @returns
 */
function rgbToHsl(r: number, g: number, b: number): ReturnType {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0,
    (2 * l - s) / 2,
  ];
}

const hslToRgb = (h: number, s: number, l: number): ReturnType => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export function setSolidColor(color: string, amount: number) {
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(...rgb);
  hsl[2] -= amount / 100;
  hsl[2] = Math.min(1, Math.max(0, hsl[2]));

  return rgbToHex(...hslToRgb(...hsl));
}

/**
 * colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor(colorTextBase, 0.85),

    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6),
 */

/**
 * 两种颜色根据一定的比例混合在一起，生成另一种颜色
 * @param color1 颜色
 * @param color2 颜色
 * @param weight 选择权重
 * @returns
 */
function sunMix(color1: string, color2: string, weight = 50) {
  const rbg1 = hexToRgb(color1);
  const rbg2 = hexToRgb(color2);
  const scale = weight / 100;
  let result = "#";
  for (let i = 0; i < 3; i++) {
    const val = Math.ceil(rbg1[i] * scale + rbg2[i] * (1 - scale));
    result += val.toString(16).padStart(2, "0");
  }
  return result;
}

interface Opts {
  name?: string;
  level?: number;
  theme?: string;
  callback?: (key: string, value: string) => void;
}

export function generate(color: string, opt: Opts = {}) {
  const { level = 9, theme = "#ffffff", name = "primary", callback } = opt;
  const result: { [key: string]: string } = { [name]: color };
  callback?.(name, color);

  let key = "";
  let value = "";
  for (let i = 1; i <= level; i++) {
    key = `${name}-${i}`;
    value = sunMix(color, theme, i * 10);
    callback?.(key, value);
    result[key] = value;
  }
  return result;
}
