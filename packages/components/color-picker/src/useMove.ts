import { useEventListener, useMouseMove } from "@nimble-ui/hooks";
import { onMounted, reactive, ref } from "vue";

interface OptionsType {
  expand: number;
  direction: "x" | "y" | "xy";
  onChange: (rgba: [number, number, number, number]) => void;
}

export default function useMove(options: OptionsType) {
  const { direction, expand } = options;
  const containerRef = ref<HTMLDivElement>();
  const canvasRef = ref<HTMLCanvasElement>();
  const moveRef = ref<HTMLSpanElement>();
  const dis = reactive({ x: 0, y: 0 });

  const isX = direction.includes("x");
  const isY = direction.includes("y");

  const getSiteColor = ({ disX, disY }: { disX: number; disY: number }) => {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!ctx || !canvas || !moveRef.value) return;

    const { width, height } = canvas.getBoundingClientRect();
    const { width: targetWidth, height: targetHeight } = moveRef.value.getBoundingClientRect();
    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;
    const currentX = dis.x + disX + centerOffsetX;
    const currentY = dis.y + disY + centerOffsetY;

    const clientX = Math.max(0, Math.min(currentX, width - 1));
    const clientY = Math.max(0, Math.min(currentY, height - 1));

    const imageData = ctx.getImageData(isX ? Math.floor(clientX) : 0, isY ? Math.floor(clientY) : 0, 1, 1);
    return imageData.data;
  };

  const { data } = useMouseMove(moveRef, {
    expand,
    stop: true,
    prevent: true,
    moveLimit: true,
    boundary: containerRef,
    move(data) {
      const value = getSiteColor(data);
      if (value) {
        const [r, g, b, a] = value;
        options.onChange([r, g, b, a / 255]);
      }
    },
    up(data) {
      const { disX, disY } = data;
      isX && (dis.x = disX + dis.x);
      isY && (dis.y = disY + dis.y);
    },
  });

  onMounted(() => {
    const container = containerRef.value;
    const canvas = canvasRef.value;
    if (!container || !canvas) return;

    const { offsetHeight, offsetWidth } = container;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;
  });

  useEventListener(
    "click",
    (e) => {
      const { clientX, clientY } = e;
      const el = e.target as HTMLCanvasElement;
      const { left, top } = el.getBoundingClientRect();
      const disX = clientX - left;
      const disY = clientY - top;
      const ctx = el.getContext("2d", { willReadFrequently: true });
      const imageData = ctx?.getImageData(isX ? disX : 0, isY ? disY : 0, 1, 1);
      console.log(imageData);
    },
    { target: canvasRef }
  );

  return {
    dis,
    data,
    moveRef,
    canvasRef,
    containerRef,
  };
}
