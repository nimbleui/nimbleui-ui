import { Teleport, Transition, defineComponent, inject, reactive, ref, CSSProperties } from "vue";
import { tooltipContextKey, type RectInfo } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";
import { useCreateIndex, useLazyRender, useScrollParent } from "@yy/hooks";

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

    const { lazyRender } = useLazyRender(() => props.show);
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

      const tTop = disT + height + DIS;
      const bTop = disT - offsetHeight - DIS;
      const lRight = disR + width + DIS;
      const lLeft = disR - offsetWidth - DIS;

      const disY = offsetHeight - rect?.height;
      const disX = offsetWidth - rect?.width;

      let transform = "";
      let transformOrigin = "";
      if (placement === "bottom") {
        transform = `translateX(${disL - disX / 2}px) translateY(${disB >= offsetHeight + DIS_BOTTOM ? tTop : bTop}px)`;
        transformOrigin = disB >= offsetHeight + DIS_BOTTOM ? "top center" : "bottom center";
      } else if (placement === "top") {
        transform = `translateX(${disL - disX / 2}px) translateY(${disT >= offsetHeight + DIS_BOTTOM ? bTop : tTop}px)`;
        transformOrigin = disT >= offsetHeight + DIS_BOTTOM ? "bottom center" : "top center";
      } else if (placement === "left") {
        transform = `translateX(${disL >= offsetWidth + DIS_BOTTOM ? lLeft : lRight}px) translateY(${
          disT - disY / 2
        }px)`;
        transformOrigin = disL >= offsetWidth + DIS_BOTTOM ? "left center" : "right center";
      } else {
        transform = `translateX(${disL >= offsetWidth + DIS_BOTTOM ? lRight : lLeft}px) translateY(${
          disT - disY / 2
        }px)`;
        transformOrigin = disR >= offsetWidth + DIS_BOTTOM ? "right center" : "left center";
      }
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

    const renderContent = lazyRender(() => {
      const { transition, show, maxHeight, maxWidth } = props;
      return (
        <div style={styles} class={bem.b()}>
          <Transition appear name={transition} onEnter={handleEnter}>
            <div
              v-show={show}
              class={bem.e("content")}
              ref={tooltipContext?.contentRef}
              style={{
                maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
                maxHeight: isNumber(maxHeight) ? `${maxHeight}px` : maxHeight,
              }}
              onClick={handleEvent}
              onMouseleave={handleEvent}
              onMouseenter={handleEvent}
            >
              <span class={[bem.m("arrow", "content"), bem.is(placementRef.value)]}></span>
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
