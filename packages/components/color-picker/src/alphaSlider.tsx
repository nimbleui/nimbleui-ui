import { type CSSProperties, computed, defineComponent, type PropType, watch, onMounted, ref } from "vue";
import useMove from "./useMove";
import { createNamespace } from "@nimble-ui/utils";
import { createLinearGradient } from "./color";

export default defineComponent({
  name: "AlphaSlider",
  props: {
    color: {
      type: Array as PropType<number[]>,
    },
    alpha: {
      type: Number,
      default: 1,
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const bem = createNamespace("alpha-slider");
    const disX = ref(0);
    const { dis, moveRef, canvasRef, containerRef } = useMove({
      expand: 8,
      direction: "x",
      onChange(value) {
        ctx.emit("change", value[3]);
      },
    });

    const renderColor = () => {
      const { color } = props;
      const canvas = canvasRef.value;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas || !color) return;
      const [r, g, b] = color;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      createLinearGradient("l", ctx, width, height, `rgba(${r},${g},${b},0)`, `rgba(${color?.join(",")})`);
    };

    const getSite = () => {
      const val = props.alpha;
      const canvas = canvasRef.value;
      if (!val || !canvas) return;
      const { width } = canvas;
      disX.value = width * val;
      if (!dis.x) dis.x = disX.value;
    };
    const moveStyle = computed<CSSProperties>(() => {
      const { color, alpha } = props;
      if (!color) return {};
      const [r, g, b] = color;
      return {
        left: `${disX.value - 6}px`,
        backgroundColor: `rgba(${r},${g},${b},${alpha})`,
      };
    });

    onMounted(() => {
      renderColor();
      getSite();
    });
    watch(
      () => props.alpha,
      () => {
        getSite();
      }
    );

    watch(
      () => props.color,
      () => {
        renderColor();
      }
    );

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
