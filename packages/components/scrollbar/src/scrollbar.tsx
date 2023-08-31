import { defineComponent, ref } from "vue";

import scrollbarProps from "./types";
import { createNamespace } from "@nimble-ui/utils";

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
      const { tag: Component, contentClass, contentStyle, native } = props;
      return (
        <div class={bem.b()} ref={scrollbarRef}>
          <div
            ref={wrapRef}
            onScroll={onScroll}
            class={[bem.e("wrap"), !native ? bem.m("hidden-bar", "wrap") : undefined]}
          >
            <Component style={contentStyle} class={contentClass} ref={resizeRef}>
              {ctx.slots.default?.()}
            </Component>
          </div>
        </div>
      );
    };
  },
});
