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
      const { selectWidth } = props;
      const left = (offsetWidth - selectWidth) / 2;
      return {
        position: "absolute",
        left: `${offsetLeft + left}px`,
        top: `${offsetTop + offsetHeight}px`,
        width: selectWidth ? `${selectWidth}px` : undefined,
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
