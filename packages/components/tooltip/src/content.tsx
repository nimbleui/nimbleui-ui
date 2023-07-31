import { Teleport, Transition, defineComponent, inject, reactive, ref, CSSProperties } from "vue";
import { tooltipContextKey, type RectInfo } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";
import { useLazyRender, useScrollParent } from "@yy/hooks";

import { contentProps } from "./props";

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

    useScrollParent(tooltipContext.triggerRef, () => {
      if (tooltipContext.contentRef.value) {
        handleEnter(tooltipContext.contentRef.value);
      }
    });
    const { lazyRender } = useLazyRender(() => props.show);

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

    const handleEnter = (element: Element) => {
      const el = element as HTMLElement;
      const { height, width } = tooltipContext.rectInfo;
      const { maxWidth, maxHeight, placement } = props;
      const { offsetHeight, offsetWidth } = el;
      const rect = tooltipContext.triggerRef.value?.getBoundingClientRect() as DOMRect;
      const disB = window.innerHeight - rect?.bottom;
      const disR = window.innerWidth - rect?.right;
      const disL = rect?.left;
      const disT = rect?.top;

      const tTop = disT + height + 5;
      const bTop = disT - offsetHeight - 5;
      if (placement === "bottom") {
        styles.transform = `translateX(${disL}px) translateY(${disB >= offsetHeight ? tTop : bTop}px)`;
        el.style.transformOrigin = disB >= offsetHeight ? "top center" : "bottom center";
      } else if (placement === "top") {
        styles.transform = `translateX(${disL}px) translateY(${disT >= offsetHeight ? bTop : tTop}px)`;
        el.style.transformOrigin = disT >= offsetHeight ? "bottom center" : "top center";
      } else if (placement === "left") {
        console.log(222);
      }

      styles.maxWidth = isNumber(maxWidth) ? `${maxWidth}px` : maxWidth;
      styles.maxHeight = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
    };

    const render = lazyRender(() => {
      const { transition, show } = props;
      return (
        <div style={styles} class={bem.b()}>
          <Transition appear name={transition} onEnter={handleEnter}>
            <div
              v-show={show}
              class={bem.e("content")}
              ref={tooltipContext?.contentRef}
              onClick={handleEvent}
              onMouseleave={handleEvent}
              onMouseenter={handleEvent}
            >
              <span></span>
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
          {render()}
        </Teleport>
      );
    };
  },
});
