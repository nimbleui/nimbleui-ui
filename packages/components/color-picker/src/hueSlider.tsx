import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, type CSSProperties, onMounted, PropType, watch } from "vue";

import useMove from "./useMove";
import { type HSVType } from "./color";

export default defineComponent({
  name: "HueSlider",
  props: {
    hsv: {
      type: Object as PropType<HSVType>,
    },
  },
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

    const color2Site = () => {
      const val = props.hsv;
      const canvas = canvasRef.value;
      if (!val || !canvas) return;
      const { h } = val;
      const { width } = canvas;
      dis.x = Math.max((1 - h / 360) * width - 6, 0);
    };

    onMounted(() => {
      renderHueColor();
      color2Site();
    });
    watch(() => props.hsv, color2Site, { deep: true });

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
