import { defineComponent, ref } from "vue";

import scrollbarProps from "./types";

export default defineComponent({
  name: "YScrollbar",
  props: scrollbarProps(),
  setup(props, ctx) {
    const scrollbarRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLElement>();

    const onScroll = () => {
      console.log(222);
    };

    return () => {
      const { tag: Component } = props;
      return (
        <div ref={scrollbarRef} onScroll={onScroll}>
          <Component ref={resizeRef}>{ctx.slots.default?.()}</Component>
        </div>
      );
    };
  },
});
