import { BEM } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, type CSSProperties, onMounted, PropType } from "vue";

import { createLinearGradient } from "./color";
import useMove from "./useMove";
export default defineComponent({
  name: "ColorContent",
  props: {
    color: {
      type: String,
      default: "",
    },
    bem: {
      type: Object as PropType<BEM>,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const rgba = reactive<number[]>([]);

    const { dis, data, moveRef, canvasRef, containerRef } = useMove({
      expand: 8,
      direction: "xy",
      onChange(value) {
        rgba.length = 0;
        rgba.push(...value);
        ctx.emit("change", value);
      },
    });

    const moveStyle = computed<CSSProperties>(() => ({
      left: `${dis.x + data.disX}px`,
      top: `${dis.y + data.disY}px`,
    }));

    const renderPanelColor = (color: string) => {
      const canvas = canvasRef.value;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      ctx.fillStyle = color;
      const { width, height } = canvas;
      ctx.fillRect(0, 0, width, height);
      createLinearGradient("l", ctx, width, height, "#FFFFFF", "rgba(255,255,255,0)");
      createLinearGradient("p", ctx, width, height, "rgba(0,0,0,0)", "#000000");
    };

    onMounted(() => {
      if (props.color) {
        renderPanelColor(props.color);
      }
    });

    return () => {
      const { bem } = props;
      return (
        <div ref={containerRef} class={bem.e("panel")}>
          <canvas ref={canvasRef} class={bem.m("colors", "panel")}></canvas>
          <span style={moveStyle.value} ref={moveRef} class={bem.m("move", "panel")}></span>
        </div>
      );
    };
  },
});
