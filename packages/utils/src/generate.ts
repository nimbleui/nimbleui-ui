const hexReg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

/**
 * 十六进制转化rgb
 * @param color 目标
 */
export function hexToRgb(color: string) {
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
  return result;
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

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

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
