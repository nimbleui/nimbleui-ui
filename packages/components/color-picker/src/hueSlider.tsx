import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, type CSSProperties, onMounted } from "vue";

import useMove from "./useMove";

export default defineComponent({
  name: "HueSlider",
  emits: ["change"],
  setup(props, ctx) {
    const bem = createNamespace("hue-slider");
    const rgba = reactive<number[]>([]);

    const { dis, data, moveRef, canvasRef, containerRef } = useMove({
      expand: 8,
      direction: "x",
      onChange(value) {
        rgba.length = 0;
        rgba.push(...value);
        ctx.emit("change", value);
      },
    });

    const moveStyle = computed<CSSProperties>(() => {
      return {
        left: `${dis.x + data.disX}px`,
        background: `rgba(${rgba.join(",")})`,
      };
    });

    const renderHueColor = () => {
      const canvas = canvasRef.value;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#FF0000");
      gradient.addColorStop(0.17, "#FF00FF");
      gradient.addColorStop(0.17 * 2, "#0000FF");
      gradient.addColorStop(0.17 * 3, "#00FFFF");
      gradient.addColorStop(0.17 * 4, "#00FF00");
      gradient.addColorStop(0.17 * 5, "#FFFF00");
      gradient.addColorStop(1, "#FF0000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    onMounted(() => {
      renderHueColor();
    });

    return () => {
      return (
        <div ref={containerRef} class={bem.b()}>
          <canvas ref={canvasRef} class={bem.e("bar")}></canvas>
          <span style={moveStyle.value} ref={moveRef} class={bem.e("move")}></span>
        </div>
      );
    };
  },
});
