import { Teleport, Transition, defineComponent, inject, CSSProperties } from "vue";

import { tooltipContextKey } from "@yy/tokens";
import { createNamespace } from "@yy/utils";

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
      const { selectWidth } = props;
      return {
        position: "absolute",
        left: `${offsetLeft}px`,
        top: `${offsetTop + offsetHeight + 5}px`,
        width: `${selectWidth || offsetWidth}px`,
      };
    };

    const handleEvent = (e: Event) => {
      const { type: eventType } = e;
      if (eventType === "mouseenter") {
        ctx.emit("toggle", e, true);
      } else if (eventType === "mouseleave") {
        ctx.emit("toggle", e, false);
      }
    };

    return () => {
      const { appendTo, teleported, transition, show } = props;
      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={transition}>
            <div style={getStyle()} onMouseleave={handleEvent} onMouseenter={handleEvent} class={bem.b()} v-show={show}>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
