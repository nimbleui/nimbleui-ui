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
