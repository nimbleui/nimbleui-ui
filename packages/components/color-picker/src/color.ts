export function createLinearGradient(
  direction: "l" | "p",
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color1: string,
  color2: string
) {
  const isL = direction === "l";
  const gradient = ctx.createLinearGradient(0, 0, isL ? width : 0, isL ? 0 : height);
  gradient.addColorStop(0.01, color1);
  gradient.addColorStop(0.99, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function rgb2hsv(r: number, g: number, b: number) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (max == min) {
    h = 0;
  } else if (max === r) {
    if (g >= b) {
      h = (60 * (g - b)) / delta;
    } else {
      h = (60 * (g - b)) / delta + 360;
    }
  } else if (max === g) {
    h = (60 * (b - r)) / delta + 120;
  } else if (max == b) {
    h = (60 * (r - g)) / delta + 240;
  }

  h = Math.floor(h);
  const s = parseFloat((max === 0 ? 0 : 1 - min / max).toFixed(2));
  const v = parseFloat(max.toFixed(2));

  return [h, s, v];
}

const HEX_INT_MAP: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

const parseHexChannel = function (hex: string) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
  }
  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};

export const hex2rgb = (value: string) => {
  const hex = value.replace("#", "").trim();
  const rgba = [0, 0, 0, 1];
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(hex)) return rgba;

  if (hex.length === 3) {
    rgba[0] = parseHexChannel(hex[0] + hex[0]);
    rgba[1] = parseHexChannel(hex[1] + hex[1]);
    rgba[2] = parseHexChannel(hex[2] + hex[2]);
  } else if (hex.length === 6 || hex.length === 8) {
    rgba[0] = parseHexChannel(hex.slice(0, 2));
    rgba[1] = parseHexChannel(hex.slice(2, 4));
    rgba[2] = parseHexChannel(hex.slice(4, 6));
  }
  if (hex.length === 8) {
    rgba[3] = parseHexChannel(hex.slice(6)) / 255;
  }

  return rgba;
};

export interface HSVType {
  h: number;
  s: number;
  v: number;
}

export const color2hsv = (value: string, callback: (hsv: HSVType, rgba: number[], color: string) => void) => {
  let rgba: number[] = [];
  if (value?.includes("#")) {
    rgba = hex2rgb(value);
  } else if (value?.includes("rgb")) {
    const parts = value
      .replace(/rgba|rgb|\(|\)/gm, "")
      .split(/\s|,/g)
      .filter((val) => val !== "")
      .map((val, index) => (index > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10)));

    if (parts.length == 3) parts[3] = 1;
    rgba = parts;
  }

  const hsv = rgb2hsv(rgba[0], rgba[1], rgba[2]);
  callback({ h: hsv[0], s: hsv[1], v: hsv[2] }, rgba, value);
};
