import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";
import { useMouseMove } from "@nimble-ui/hooks";

import sliderProps from "./types";

export default defineComponent({
  name: "YSlider",
  props: sliderProps(),
  setup(props, ctx) {
    const bem = createNamespace("slider");
    const railRef = ref<HTMLElement>();

    const start = { left: 0 };
    useMouseMove(railRef, {
      prevent: true,
      boundary: railRef,
      moveLimit: true,
      expand: 7 * 1.2,
      agency: true,
      down(data, e, target) {
        start.left = target?.offsetLeft ?? 0;
      },
      move(data, e, target) {
        const { disX, disY, moveX } = data;
        const railEl = railRef.value;

        if (!railEl) return;
        const { height, width } = railEl.getBoundingClientRect();
        console.log(start.left + disX + 7 * 1.2);
        console.log((start.left + disX + 7 * 1.2) / width);
        target.style.left = `${start.left + disX}px`;
      },
    });

    return () => {
      return (
        <div class={bem.b()}>
          <div ref={railRef} class={bem.e("rail")}>
            <div class={bem.m("track", "rail")}></div>
            <span class={bem.m("handle", "rail")}></span>
            <span class={bem.m("handle", "rail")}></span>
          </div>
          <div class={bem.e("step")}></div>
          <div class={bem.e("mark")}></div>
        </div>
      );
    };
  },
});
