import { computed, defineComponent, reactive, ref } from "vue";
import { createNamespace, isNumber, isObject } from "@nimble-ui/utils";
import { useMouseMove, useResizeObserver } from "@nimble-ui/hooks";

import scrollbarProps from "./types";

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
      const scrollType = props.xScroll ? "scrollWidth" : "scrollHeight";

      const bar = barRef.value?.[type] || 0;
      const wrap = wrapRef.value?.[type] || 0;
      const resize = wrapRef.value?.[scrollType] || 0;
      Object.assign(clientRect, {
        bar,
        wrap,
        resize,
      });
    };
    useResizeObserver(resizeRef, getElementRect);

    let memoYTop = 0;
    const { isMove } = useMouseMove(moveRef, {
      stop: true,
      prevent: true,
      boundary: barRef,
      down() {
        memoYTop = clientRect.scroll;
      },
      move(data) {
        const { xScroll } = props;
        const { disY, disX } = data;
        const { wrap, resize, bar } = clientRect;
        const diff = resize - wrap;

        const barSize = barSizeRef.value;
        const dis = xScroll ? disX : disY;
        const dScrollTop = (Math.round(dis) * diff) / Math.round(bar - barSize);

        const scrollTop = dScrollTop + memoYTop;
        if (wrapRef.value) {
          if (xScroll) {
            wrapRef.value.scrollLeft = scrollTop;
          } else {
            wrapRef.value.scrollTop = scrollTop;
          }
        }
      },
      up(data, e) {
        const checked = scrollbarRef.value?.contains(e.target as HTMLElement);
        hoverRef.value = checked ?? false;
      },
    });

    // 滚动条的大小
    const barSizeRef = computed(() => {
      const { bar, wrap, resize } = clientRect;
      return Math.min(wrap, (bar * wrap) / resize + props.size * 1.5);
    });

    // 滚动条的距离
    const barDisRef = computed(() => {
      const { bar, resize, scroll } = clientRect;
      const diff = resize - bar;

      return diff ? (scroll / diff) * (bar - barSizeRef.value) : 0;
    });

    // 计算滚动条的位置
    const barStyle = computed(() => {
      const { xScroll, size } = props;
      const barSize = barSizeRef.value;
      const barDis = barDisRef.value;

      return {
        width: xScroll ? `${barSize}px` : `${size}px`,
        height: xScroll ? `${size}px` : `${barSize}px`,
        transform: `translate(${xScroll ? barDis : 0}px, ${xScroll ? 0 : barDis}px)`,
      };
    });

    const hoverRef = ref(false);
    const showBar = computed(() => {
      const { native, trigger } = props;
      const { wrap, resize } = clientRect;
      // 如果内容高度小于等于滚动的高度，隐藏
      if (wrap >= resize) return false;

      if (native || trigger == "hide") {
        return false;
      } else if (trigger == "none") {
        return true;
      }
      return hoverRef.value;
    });
    const handleHover = (isEnter: boolean) => {
      return () => {
        isEnter && getElementRect();
        hoverRef.value = isMove.value ? true : isEnter;
      };
    };

    function scrollTo(options: ScrollToOptions): void;
    function scrollTo(x: number, y: number): void;
    function scrollTo(options: unknown, y?: number) {
      if (isObject(options)) {
        wrapRef.value?.scrollTo(options);
      } else if (isNumber(options) && isNumber(y)) {
        wrapRef.value?.scrollTo(options, y);
      }
    }

    function setScrollTop(value: number) {
      if (!isNumber(value)) {
        return console.warn("Value必须是一个数字");
      }
      wrapRef.value && (wrapRef.value.scrollTop = value);
    }

    function setScrollLeft(value: number) {
      if (!isNumber(value)) {
        return console.warn("Value必须是一个数字");
      }
      wrapRef.value && (wrapRef.value.scrollLeft = value);
    }

    ctx.expose({
      scrollTo,
      setScrollTop,
      setScrollLeft,
      update: getElementRect,
    });

    return () => {
      const { tag: Component, contentClass, contentStyle, native, xScroll, wrapClass, wrapStyle } = props;
      return (
        <div onMouseenter={handleHover(true)} onMouseleave={handleHover(false)} class={bem.b()} ref={scrollbarRef}>
          <div
            ref={wrapRef}
            onScroll={onScroll}
            style={wrapStyle}
            class={[bem.e("wrap"), !native ? bem.m("hidden-bar", "wrap") : undefined, wrapClass]}
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
