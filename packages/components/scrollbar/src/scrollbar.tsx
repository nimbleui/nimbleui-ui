import { defineComponent, ref } from "vue";

import scrollbarProps from "./types";
import { createNamespace } from "@yy/utils";

export default defineComponent({
  name: "YScrollbar",
  props: scrollbarProps(),
  setup(props, ctx) {
    const bem = createNamespace("scrollbar");
    const scrollbarRef = ref<HTMLDivElement>();
    const wrapRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLElement>();

    const onScroll = () => {
      console.log(222);
    };

    return () => {
      const { tag: Component, contentClass, contentStyle } = props;
      return (
        <div class={bem.b()} ref={scrollbarRef}>
          <div class={[bem.e("wrap"), bem.m("hidden-bar", "warp")]} ref={wrapRef} onScroll={onScroll}>
            <Component style={contentStyle} class={contentClass} ref={resizeRef}>
              {ctx.slots.default?.()}
            </Component>
          </div>
        </div>
      );
    };
  },
});
