import { Teleport, Transition, defineComponent, inject, CSSProperties } from "vue";

import { tooltipContextKey } from "@yy/tokens";

import { contentProps } from "./props";
import { createNamespace } from "@yy/utils";

export default defineComponent({
  name: "YContent",
  props: contentProps(),
  setup(props, ctx) {
    const bem = createNamespace("content");
    const tooltipContext = inject(tooltipContextKey);

    const getStyle = (): CSSProperties => {
      const el = tooltipContext?.triggerRef.value;
      if (!el) return {};
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = el;
      return {
        position: "absolute",
        left: `${offsetLeft}px`,
        top: `${offsetTop + offsetHeight}px`,
      };
    };

    return () => {
      const { appendTo, teleported, transition, show } = props;
      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={transition}>
            <div style={getStyle()} class={bem.b()} v-show={show}>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
