import { Teleport, Transition, defineComponent, inject, CSSProperties, computed, ref, reactive } from "vue";

import { tooltipContextKey } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";

import { contentProps } from "./props";
import { useGetHideElementRect, useGetScreenDistance } from "@yy/hooks";

export default defineComponent({
  name: "YContent",
  props: contentProps(),
  emits: ["toggle", "clickItem"],
  setup(props, ctx) {
    const bem = createNamespace("tooltip-content");
    const tooltipContext = inject(tooltipContextKey, {
      triggerRef: ref<HTMLElement>(),
      contentRef: ref<HTMLElement>(),
      setRef: (el) => el,
    });

    // const styles = reactive<CSSProperties>({});
    const showRef = computed(() => props.show);
    const { screenRect } = useGetScreenDistance(tooltipContext.triggerRef);
    const { show, visible, rect } = useGetHideElementRect(showRef, tooltipContext.contentRef);

    // const sunLocation = () => {
    //   const { placement } = props;
    //   const { disBottom, disLeft, disRight, disTop } = screenRect;
    //   const { width, height } = rect;
    // };

    const getStyle = (): CSSProperties => {
      const el = tooltipContext?.triggerRef.value;
      if (!el) return {};
      const { width, height } = el.getBoundingClientRect();
      const { offsetLeft, offsetTop } = el;
      const { selectWidth, maxHeight } = props;

      return {
        position: "absolute",
        left: `${offsetLeft}px`,
        top: `${offsetTop + height + 5}px`,
        minWidth: `${selectWidth || width}px`,
        maxHeight: isNumber(maxHeight) ? `${maxHeight}px` : maxHeight,
      };
    };

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

    return () => {
      const { appendTo, teleported, transition } = props;

      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={visible.value ? undefined : transition}>
            <div
              class={bem.b()}
              v-show={show.value}
              ref={tooltipContext?.contentRef}
              style={[getStyle(), { visibility: visible.value ? "hidden" : "visible" }]}
              onClick={handleEvent}
              onMouseleave={handleEvent}
              onMouseenter={handleEvent}
            >
              <span></span>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
