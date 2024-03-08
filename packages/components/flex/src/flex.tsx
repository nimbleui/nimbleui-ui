import { createNamespace, isNumber } from "@nimble-ui/utils";
import { computed, defineComponent, type CSSProperties } from "vue";

import flexProps from "./types";
const gapType = ["small", "middle", "large"];

const YFlex = defineComponent({
  name: "YFlex",
  props: flexProps(),
  emits: ["click", "mouseenter"],
  setup(props, ctx) {
    const bem = createNamespace("flex");

    const flexCls = computed(() => {
      const { vertical, justify, align, wrap, gap, reverse, inline } = props;

      return [
        bem.b(),
        bem.is("wrap", wrap),
        bem.is("inline", inline),
        bem.is("vertical", vertical),
        bem.is(`align-${align}`, !!align),
        bem.is(`justify-${justify}`, !!justify),
        bem.is(`gap-${gap}`, gapType.includes(gap as string)),
        bem.is(`${reverse}-reverse`, !!reverse),
      ];
    });

    const flexStyle = computed<CSSProperties>(() => {
      const { gap, flex } = props;
      return { gap: isNumber(gap) ? `${gap}px` : gap && !gapType.includes(gap) ? gap : undefined, flex: flex };
    });

    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    const onMouseenter = (e: Event) => {
      ctx.emit("mouseenter", e);
    };

    return () => {
      return (
        <div style={flexStyle.value} class={flexCls.value} onClick={onClick} onMouseenter={onMouseenter}>
          {ctx.slots.default?.()}
        </div>
      );
    };
  },
});

export default YFlex;
