import { Teleport, Transition, defineComponent, inject, reactive, ref, CSSProperties } from "vue";
import { tooltipContextKey, type RectInfo } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";
import { useCreateIndex, useLazyRender, useScrollParent } from "@yy/hooks";

import { contentProps } from "./props";

const DIS = 12;
const DIS_BOTTOM = 30;
export default defineComponent({
  name: "YContent",
  props: contentProps(),
  emits: ["toggle", "clickItem"],
  setup(props, ctx) {
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
        handleEnter(tooltipContext.contentRef.value);
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
    const handleEnter = (element: Element) => {
      const el = element as HTMLElement;
      const { height, width } = tooltipContext.rectInfo;
      const { placement } = props;
      const { offsetHeight, offsetWidth } = el;
      const rect = tooltipContext.triggerRef.value?.getBoundingClientRect() as DOMRect;
      const disB = window.innerHeight - rect?.bottom;
      const disR = window.innerWidth - rect?.right;
      const disL = rect?.left;
      const disT = rect?.top;

      const tTop = disT + height + DIS;
      const bTop = disT - offsetHeight - DIS;
      const lRight = disR + width + DIS;
      const lLeft = disR - offsetWidth - DIS;

      let transform = "";
      let transformOrigin = "";
      if (placement === "bottom") {
        transform = `translateX(${disL}px) translateY(${disB >= offsetHeight + DIS_BOTTOM ? tTop : bTop}px)`;
        transformOrigin = disB >= offsetHeight ? "top center" : "bottom center";
      } else if (placement === "top") {
        transform = `translateX(${disL}px) translateY(${disT >= offsetHeight + DIS_BOTTOM ? bTop : tTop}px)`;
        transformOrigin = disT >= offsetHeight ? "bottom center" : "top center";
      } else if (placement === "left") {
        transform = `translateX(${disL >= offsetWidth + DIS_BOTTOM ? lLeft : lRight}px) translateY(${disT}px)`;
        transformOrigin = disL >= offsetWidth ? "left center" : "right center";
      } else {
        transform = `translateX(${disL >= offsetWidth + DIS_BOTTOM ? lRight : lLeft}px) translateY(${disT}px)`;
        transformOrigin = disL >= disR ? "right center" : "left center";
      }

      styles.zIndex = zIndex;
      styles.transform = transform;
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
              <span class={[bem.m("arrow", "content"), bem.is(props.placement)]}></span>
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
