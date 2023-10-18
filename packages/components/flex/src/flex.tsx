import { createNamespace, isNumber } from "@nimble-ui/utils";
import { computed, defineComponent, type CSSProperties } from "vue";

import flexProps from "./types";
const gapType = ["small", "middle", "large"];

export default defineComponent({
  name: "YFlex",
  props: flexProps(),
  setup(props, ctx) {
    const bem = createNamespace("flex");

    const flexCls = computed(() => {
      const { vertical, justify, align, wrap, gap } = props;

      return [
        bem.b(),
        bem.is("wrap", wrap),
        bem.is("vertical", vertical),
        bem.is(`align-${align}`, !!align),
        bem.is(`justify-${justify}`, !!justify),
        bem.is(`gap-${gap}`, gapType.includes(gap as string)),
      ];
    });

    const flexStyle = computed<CSSProperties>(() => {
      const { gap } = props;
      if (!gap) return {};
      return { gap: isNumber(gap) ? `${gap}px` : gapType.includes(gap) ? undefined : gap };
    });

    return () => {
      const { tag: Component } = props;
      return (
        <Component style={flexStyle.value} class={flexCls.value}>
          {ctx.slots.default?.()}
        </Component>
      );
    };
  },
});
