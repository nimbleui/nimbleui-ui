import { createNamespace, isFunction, isNumber } from "@nimble-ui/utils";
import { computed, defineComponent, type CSSProperties } from "vue";

import flexProps, { FlexItemsIsFlex } from "./types";
const gapType = ["small", "middle", "large"];

const YFlex = defineComponent({
  name: "YFlex",
  props: flexProps(),
  emits: ["click"],
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
      const { gap, flex } = props;
      return { gap: isNumber(gap) ? `${gap}px` : gap && !gapType.includes(gap) ? gap : undefined, flex: flex };
    });

    const isFlex = (item: any): item is FlexItemsIsFlex => !!item.isFlex;

    const render = () => {
      const { items, details } = props;
      return items
        ? items.map((item) => {
            const children = isFunction(item.children) ? item.children(details) : item.children;
            if (isFlex(item)) {
              return (
                <YFlex key={item.name} {...item}>
                  {children}
                </YFlex>
              );
            } else {
              return (
                <div key={item.name} class={item.class} style={item.style}>
                  {children}
                </div>
              );
            }
          })
        : ctx.slots.default?.();
    };

    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    return () => {
      const { tag: Component } = props;
      return (
        <Component style={flexStyle.value} class={flexCls.value} onClick={onClick}>
          {render()}
        </Component>
      );
    };
  },
});

export default YFlex;
