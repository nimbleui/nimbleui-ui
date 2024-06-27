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
    const barYRef = ref<HTMLDivElement>();
    const barXRef = ref<HTMLDivElement>();
    const moveYRef = ref<HTMLDivElement>();
    const moveXRef = ref<HTMLDivElement>();

    const clientRect = reactive({
      barY: 0,
      barX: 0,
      wrapY: 0,
      wrapX: 0,
      resizeY: 0,
      resizeX: 0,
      scrollX: 0,
      scrollY: 0,
    });
    const onScroll = () => {
      const wrap = wrapRef.value;
      if (!wrap) return;
      clientRect.scrollX = wrap.scrollLeft;
      clientRect.scrollY = wrap.scrollTop;
      ctx.emit("scroll", {
        scrollLeft: wrap.scrollLeft,
        scrollTop: wrap.scrollTop,
        scroll: clientRect[isMoveY.value ? "scrollY" : "scrollX"],
      });
    };

    const getElementRect = () => {
      const barY = barYRef.value?.offsetHeight || 0;
      const barX = barXRef.value?.offsetWidth || 0;
      const wrapY = wrapRef.value?.offsetHeight || 0;
      const wrapX = wrapRef.value?.offsetWidth || 0;
      const resizeY = wrapRef.value?.scrollHeight || 0;
      const resizeX = wrapRef.value?.scrollWidth || 0;
      Object.assign(clientRect, {
        barY,
        barX,
        wrapY,
        wrapX,
        resizeY,
        resizeX,
      });
    };
    useResizeObserver(resizeRef, getElementRect);

    let moveDis = 0;
    const handleMove = (data: any, isXScroll: boolean) => {
      const { disY, disX } = data;
      const { wrapY, wrapX, resizeY, resizeX, barY, barX } = clientRect;
      const diff = isXScroll ? resizeX - wrapX : resizeY - wrapY;
      const bar = isXScroll ? barX : barY;

      const barSize = barSizeRef.value[isXScroll ? "x" : "y"];
      const dis = isXScroll ? disX : disY;
      const dScrollTop = (dis * diff) / (bar - barSize);

      const scrollTop = dScrollTop + moveDis;
      if (wrapRef.value) {
        wrapRef.value[isXScroll ? "scrollLeft" : "scrollTop"] = scrollTop;
      }
    };
    const { isMove: isMoveY } = useMouseMove(moveYRef, {
      stop: true,
      prevent: true,
      boundary: barYRef,
      moveLimit: true,
      down() {
        moveDis = clientRect.scrollY;
      },
      move(data) {
        handleMove(data, false);
      },
      up(data, e) {
        const checked = scrollbarRef.value?.contains(e.target as HTMLElement);
        hoverRef.value = checked ?? false;
      },
    });

    const { isMove: isMoveX } = useMouseMove(moveXRef, {
      stop: true,
      prevent: true,
      boundary: barXRef,
      moveLimit: true,
      down() {
        moveDis = clientRect.scrollX;
      },
      move(data) {
        handleMove(data, true);
      },
      up(data, e) {
        const checked = scrollbarRef.value?.contains(e.target as HTMLElement);
        hoverRef.value = checked ?? false;
      },
    });

    // 滚动条的大小
    const barSizeRef = computed(() => {
      const { barY, barX, wrapY, wrapX, resizeY, resizeX } = clientRect;
      return {
        x: Math.min(barX, (barX * wrapX) / resizeX + props.size * 1.5),
        y: Math.min(barY, (barY * wrapY) / resizeY + props.size * 1.5),
      };
    });

    // 滚动条的距离
    const barDisRef = computed(() => {
      const { wrapY, wrapX, barY, barX, resizeY, resizeX, scrollY, scrollX } = clientRect;
      const diffX = resizeX - wrapX;
      const diffY = resizeY - wrapY;

      return {
        x: diffX ? (scrollX / diffX) * (barX - barSizeRef.value.x) : 0,
        y: diffY ? (scrollY / diffY) * (barY - barSizeRef.value.y) : 0,
      };
    });

    // 计算滚动条的位置
    const barStyle = computed(() => {
      const { size } = props;
      const { x, y } = barSizeRef.value;
      const { x: disX, y: disY } = barDisRef.value;

      return {
        x: {
          width: `${x}px`,
          height: `${size}px`,
          transform: `translate(${disX}px, 0px)`,
        },
        y: {
          width: `${size}px`,
          height: `${y}px`,
          transform: `translate(0px, ${disY}px)`,
        },
      };
    });

    const hoverRef = ref(false);
    const showBar = computed(() => {
      const { native, trigger } = props;
      const { wrapY, wrapX, resizeY, resizeX } = clientRect;
      let x = true;
      let y = true;
      if (wrapY >= resizeY) y = false;
      if (wrapX >= resizeX) x = false;

      if (native || trigger == "hide") {
        return { x: false, y: false };
      } else if (trigger == "none") {
        return { x, y };
      }
      return {
        x: x && hoverRef.value,
        y: y && hoverRef.value,
      };
    });
    const handleHover = (isEnter: boolean) => {
      return () => {
        isEnter && getElementRect();
        hoverRef.value = isMoveY.value || isMoveX.value ? true : isEnter;
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
            style={[
              wrapStyle ?? {},
              {
                marginRight: clientRect.wrapY >= clientRect.resizeY ? undefined : "8px",
                marginBottom: clientRect.wrapX >= clientRect.resizeX ? undefined : "8px",
              },
            ]}
            class={[bem.e("wrap"), !native ? bem.m("hidden-bar", "wrap") : undefined, wrapClass]}
          >
            <Component
              style={[contentStyle, { width: xScroll ? "fit-content" : undefined }]}
              class={[bem.m("content", "wrap"), contentClass]}
              ref={resizeRef}
            >
              {ctx.slots.default?.()}
            </Component>
          </div>
          <div ref={barYRef} class={[bem.e("rail")]}>
            <div ref={moveYRef} v-show={showBar.value.y} class={bem.m("bar", "rail")} style={barStyle.value.y}></div>
          </div>
          {xScroll && (
            <div ref={barXRef} class={[bem.e("rail"), bem.is("horizontal", xScroll)]}>
              <div ref={moveXRef} v-show={showBar.value.x} class={bem.m("bar", "rail")} style={barStyle.value.x}></div>
            </div>
          )}
        </div>
      );
    };
  },
});
