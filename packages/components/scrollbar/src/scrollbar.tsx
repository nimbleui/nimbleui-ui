import { computed, defineComponent, reactive, ref } from "vue";

import scrollbarProps from "./types";
import { createNamespace } from "@nimble-ui/utils";
import { useMouseMove, useResizeObserver } from "@nimble-ui/hooks";

export default defineComponent({
  name: "YScrollbar",
  props: scrollbarProps(),
  emits: ["scroll"],
  setup(props, ctx) {
    const bem = createNamespace("scrollbar");
    const scrollbarRef = ref<HTMLDivElement>();
    const wrapRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLElement>();
    const barRef = ref<HTMLDivElement>();
    const moveRef = ref<HTMLDivElement>();

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
      ctx.emit("scroll", clientRect.scroll);
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
      if (!diff) return { size: 0, top: 0 };

      const barSize = Math.min(wrap, (bar * wrap) / resize + props.size * 1.5);
      return {
        size: barSize,
        top: diff ? (scroll / diff) * (bar - barSize) : 0,
      };
    });

    useResizeObserver(resizeRef, getElementRect);
    const { data, isMove } = useMouseMove(moveRef, {
      boundary: barRef,
    });

    const barStyle = computed(() => {
      const { xScroll, size: value } = props;
      const { size, top } = barSize.value;
      const { disY } = data;

      return {
        width: xScroll ? `${size}px` : `${value}px`,
        height: xScroll ? `${value}px` : `${size}px`,
        transform: `translate(${xScroll ? top : 0}px, ${xScroll ? 0 : top}px)`,
      };
    });

    const hoverRef = ref(false);
    const showBar = computed(() => {
      const { native, trigger } = props;
      if (native || trigger == "hide") {
        return false;
      } else if (trigger == "none") {
        return true;
      }
      return hoverRef.value;
    });
    const handleHover = (isEnter: boolean) => {
      return () => {
        hoverRef.value = isEnter;
      };
    };

    return () => {
      const { tag: Component, contentClass, contentStyle, native, xScroll } = props;
      return (
        <div onMouseenter={handleHover(true)} onMouseleave={handleHover(false)} class={bem.b()} ref={scrollbarRef}>
          <div
            ref={wrapRef}
            onScroll={onScroll}
            class={[bem.e("wrap"), !native ? bem.m("hidden-bar", "wrap") : undefined]}
          >
            <Component
              style={[contentStyle, { width: xScroll ? "fit-content" : undefined }]}
              class={contentClass}
              ref={resizeRef}
            >
              {ctx.slots.default?.()}
            </Component>
          </div>
          <div ref={barRef} class={[bem.e("rail"), bem.is("horizontal", xScroll)]}>
            <div ref={moveRef} v-show={showBar.value} class={bem.m("bar", "rail")} style={barStyle.value}></div>
          </div>
        </div>
      );
    };
  },
});
