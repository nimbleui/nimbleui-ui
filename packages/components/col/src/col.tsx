import { CSSProperties, computed, defineComponent, inject } from "vue";
import { rowContextKey } from "@nimble-ui/tokens";
import { createNamespace, handlePropOrContext, isNumber, isObject } from "@nimble-ui/utils";

import colProps from "./types";

export default defineComponent({
  name: "YCol",
  props: colProps(),
  setup(props, ctx) {
    const rowContext = inject(rowContextKey, undefined);

    const bem = createNamespace("col");
    const rowCls = computed(() => {
      const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
      const result = handlePropOrContext(props, rowContext?.value, ["span", ...sizes]);
      const classes: (string | undefined)[] = [
        bem.b(),
        bem.b(`${result.span || 24}`),
        bem.b(`pull-${props.pull}`, !!props.pull),
        bem.b(`push-${props.push}`, !!props.push),
        bem.b(`offset-${props.offset}`, !!props.offset),
      ];

      sizes.forEach((size) => {
        const value = props[size];
        if (isNumber(value)) {
          classes.push(bem.b(`${size}-${value}`));
        } else if (isObject(value)) {
          Object.entries(value).forEach(([prop, sizeProp]) => {
            classes.push(prop !== "span" ? bem.b(`${size}-${prop}-${sizeProp}`) : bem.b(`${size}-${sizeProp}`));
          });
        }
      });

      return classes.filter((el) => !!el);
    });

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (rowContext?.value.gutter) {
        styles.paddingLeft = styles.paddingRight = `${rowContext.value.gutter / 2}px`;
      }
      return styles;
    });

    return () => {
      const { tag: Component = "div" } = props;
      return (
        <Component class={rowCls.value} style={style.value}>
          {ctx.slots.default?.()}
        </Component>
      );
    };
  },
});
