import { Teleport, Transition, defineComponent, inject, CSSProperties, onMounted, computed, watch } from "vue";

import { tooltipContextKey } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";

import { contentProps } from "./props";

export default defineComponent({
  name: "YContent",
  props: contentProps(),
  emits: ["toggle", "clickItem"],
  setup(props, ctx) {
    const bem = createNamespace("tooltip-content");
    const tooltipContext = inject(tooltipContextKey);

    const getStyle = (): CSSProperties => {
      const el = tooltipContext?.triggerRef.value;
      if (!el) return {};
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = el;
      const { selectWidth, maxHeight } = props;
      return {
        position: "absolute",
        left: `${offsetLeft}px`,
        top: `${offsetTop + offsetHeight + 5}px`,
        minWidth: `${selectWidth || offsetWidth}px`,
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

    const el = computed(() => tooltipContext?.contentRef.value);

    onMounted(() => {
      watch(el, (el) => {
        if (el) {
          watch(el.getBoundingClientRect(), () => {
            console.log(11);
          });
        }
      });
    });

    return () => {
      const { appendTo, teleported, transition, show } = props;

      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={transition}>
            <div
              v-show={show}
              class={bem.b()}
              style={getStyle()}
              ref={tooltipContext?.contentRef}
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
