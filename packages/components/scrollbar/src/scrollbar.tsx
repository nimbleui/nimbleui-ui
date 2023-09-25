import { computed, defineComponent, reactive, ref } from "vue";

import scrollbarProps from "./types";
import { createNamespace } from "@nimble-ui/utils";
import { useEventListener, useResizeObserver } from "@nimble-ui/hooks";

export default defineComponent({
  name: "YScrollbar",
  props: scrollbarProps(),
  setup(props, ctx) {
    const bem = createNamespace("scrollbar");
    const scrollbarRef = ref<HTMLDivElement>();
    const wrapRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLElement>();
    const barRef = ref<HTMLDivElement>();

    const clientRect = reactive({
      bar: 0,
      wrap: 0,
      resize: 0,
      scroll: 0,
    });
    const onScroll = () => {
      const wrap = wrapRef.value;
      if (!wrap) return;
      clientRect.scroll = props.xScroll ? wrap.scrollLeft : wrap.scrollTop;
    };

    const getElementRect = () => {
      const type = props.xScroll ? "offsetWidth" : "offsetHeight";
      const bar = barRef.value?.[type] || 0;
      const wrap = wrapRef.value?.[type] || 0;
      const resize = resizeRef.value?.[type] || 0;
      Object.assign(clientRect, {
        bar,
        wrap,
        resize,
      });
    };

    const barSize = computed(() => {
      const { bar, wrap, resize, scroll } = clientRect;

      const diff = resize - wrap;
      const barSize = Math.min(wrap, (bar * wrap) / resize + props.size * 1.5);
      return {
        size: barSize,
        top: diff ? (scroll / diff) * (bar - barSize) : 0,
      };
    });

    useResizeObserver(resizeRef, getElementRect);
    useEventListener(
      "mousedown",
      (e) => {
        console.log(e);
      },
      { target: barRef }
    );

    const barStyle = computed(() => {
      const { xScroll } = props;
      const { size, top } = barSize.value;
      return {
        height: `${size}px`,
        transform: `translate(${xScroll ? top : 0}px, ${xScroll ? 0 : top}px)`,
      };
    });

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
          {native ? null : (
            <div ref={barRef} class={bem.e("rail")}>
              <div class={bem.m("bar", "rail")} style={barStyle.value}></div>
            </div>
          )}
        </div>
      );
    };
  },
});
