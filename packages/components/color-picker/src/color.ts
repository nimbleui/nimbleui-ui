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

function bound01(value: number, max: number) {
  value = Math.min(max as number, Math.max(0, value));

  if (Math.abs(value - (max as number)) < 0.000001) {
    return 1;
  }

  return (value % (max as number)) / max;
}

export function rgb2hsv(r: number, g: number, b: number) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
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
      default:
        break;
    }

    h /= 6;
  }

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
