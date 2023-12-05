import { Teleport, Transition, defineComponent, inject, reactive, ref, CSSProperties } from "vue";
import { tooltipContextKey, type RectInfo } from "@nimble-ui/tokens";
import { createNamespace, isNumber } from "@nimble-ui/utils";
import { useCreateIndex, useLazyRender, useScrollParent } from "@nimble-ui/hooks";

import { contentProps, type PlacementType } from "./props";

const DIS = 12;
const DIS_BOTTOM = 30;
export default defineComponent({
  name: "YContent",
  props: contentProps(),
  emits: ["toggle", "clickItem"],
  setup(props, ctx) {
    const placementRef = ref(props.placement);
    const bem = createNamespace("tooltip-container");
    const tooltipContext = inject(tooltipContextKey, {
      triggerRef: ref<HTMLElement>(),
      contentRef: ref<HTMLElement>(),
      setRef: (el) => el,
      rectInfo: {} as RectInfo,
    });

    useScrollParent(tooltipContext.triggerRef, () => {
      if (tooltipContext.contentRef.value && props.show) {
        handleLocation(tooltipContext.contentRef.value);
      }
    });
    const { nextZIndex } = useCreateIndex();

    const handleEvent = (e: Event) => {
      e.stopPropagation();
      const { type: eventType } = e;
      const { trigger } = props;
      if (eventType === "mouseenter" && trigger === "hover") {
        ctx.emit("toggle", e, true);
      } else if (eventType === "mouseleave" && trigger === "hover") {
        ctx.emit("toggle", e, false);
      }
    };

    const styles = reactive<CSSProperties>({});
    const zIndex = props.zIndex || nextZIndex();
    const arrowStyle = reactive<CSSProperties>({});

    // 设置箭头的位置
    const setArrowLocation = (flag: boolean) => {
      const { placement } = props;
      const [direction, seat] = placement.split("-");
      // placement第一位是bottom或top，就改变箭头left、right
      if (direction == "bottom" || direction == "top") {
        const key = seat == "end" ? "right" : "left";
        arrowStyle[key] = seat ? "12px" : "50%";
        !seat &&
          (arrowStyle.transform = `translateX(-50%) translateY(${
            (direction == "bottom" && flag) || (direction == "top" && !flag) ? "-" : ""
          }100%)`);
      } else {
        const key = seat == "end" ? "bottom" : "top";
        arrowStyle[key] = seat ? "12px" : "50%";
        !seat &&
          (arrowStyle.transform = `translateX(${
            (direction == "right" && flag) || (direction == "left" && !flag) ? "-" : ""
          }100%) translateY(-50%)`);
      }
    };

    const handleLocation = (el: HTMLElement) => {
      const { height, width } = tooltipContext.rectInfo;
      const { placement } = props;
      const { offsetHeight, offsetWidth } = el;
      const rect = tooltipContext.triggerRef.value?.getBoundingClientRect() as DOMRect;
      // 计算trigger到屏幕的距离
      const disB = window.innerHeight - rect?.bottom;
      const disR = window.innerWidth - rect?.right;
      const disL = rect?.left;
      const disT = rect?.top;
      const right = rect?.right;
      const bottom = rect?.bottom;

      const tTop = disT + height + DIS;
      const bTop = disT - offsetHeight - DIS;
      const lRight = disL + width + DIS;
      const lLeft = disL - offsetWidth - DIS;

      const disY = offsetHeight - rect?.height;
      const disX = offsetWidth - rect?.width;

      const seat = placement.split("-")[1];
      let transform = "";
      let transformOrigin = "";
      let flag = false;
      let x = disL;
      let y = disT;
      let xSeat = "left";
      let ySeat = "top";

      if (seat == "end") {
        x = right - offsetWidth;
        y = bottom - offsetHeight;
        xSeat = "right";
        ySeat = "bottom";
      } else if (!seat) {
        x = disL - disX / 2;
        y = disT - disY / 2;
        xSeat = "center";
        ySeat = "center";
      }

      if (placement.indexOf("bottom") == 0) {
        flag = disB >= offsetHeight + DIS_BOTTOM;
        transform = `translateX(${x}px) translateY(${flag ? tTop : bTop}px)`;
        transformOrigin = `${flag ? "top" : "bottom"} ${xSeat}`;
      } else if (placement.indexOf("top") == 0) {
        flag = disT >= offsetHeight + DIS_BOTTOM;
        transform = `translateX(${x}px) translateY(${flag ? bTop : tTop}px)`;
        transformOrigin = `${flag ? "bottom" : "top"} ${xSeat}`;
      } else if (placement.indexOf("left") == 0) {
        flag = disL >= offsetWidth + DIS_BOTTOM;
        transform = `translateX(${flag ? lLeft : lRight}px) translateY(${y}px)`;
        transformOrigin = `${flag ? "right" : "left"} ${ySeat}`;
      } else {
        flag = disR >= offsetWidth + DIS_BOTTOM;
        transform = `translateX(${flag ? lRight : lLeft}px) translateY(${y}px)`;
        transformOrigin = `${flag ? "left" : "right"} ${ySeat}`;
      }
      setArrowLocation(flag);
      styles.transform = transform;
      styles.transition = "none";
      placementRef.value = transformOrigin.split(" ")[0] as PlacementType;
      return transformOrigin;
    };

    const handleEnter = (element: Element) => {
      const el = element as HTMLElement;
      const transformOrigin = handleLocation(el);

      styles.zIndex = zIndex;
      el.style.transformOrigin = transformOrigin;
    };

    const { lazyRender } = useLazyRender(() => props.show);
    const renderContent = lazyRender(() => {
      const {
        transition,
        show,
        maxHeight,
        maxWidth,
        contentClass,
        contentStyle = {},
        arrowClass,
        arrowStyle: arrowS = {},
      } = props;
      return (
        <div style={styles} class={bem.b()}>
          <Transition appear name={transition} onEnter={handleEnter}>
            <div
              v-show={show}
              class={[bem.e("content"), contentClass]}
              ref={tooltipContext?.contentRef}
              style={[
                contentStyle,
                {
                  maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
                  maxHeight: isNumber(maxHeight) ? `${maxHeight}px` : maxHeight,
                },
              ]}
              onClick={handleEvent}
              onMouseleave={handleEvent}
              onMouseenter={handleEvent}
            >
              <span
                style={[arrowStyle, arrowS]}
                class={[bem.m("arrow", "content"), bem.is(placementRef.value), arrowClass]}
              ></span>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </div>
      );
    });

    return () => {
      const { appendTo, teleported } = props;

      return (
        <Teleport to={appendTo} disabled={teleported}>
          {renderContent()}
        </Teleport>
      );
    };
  },
});
