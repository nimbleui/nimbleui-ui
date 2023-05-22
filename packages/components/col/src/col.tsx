import { CSSProperties, computed, defineComponent, inject } from "vue";
import { rowContextKey } from "@yy/tokens";
import { createNamespace, handlePropOrContext } from "@yy/utils";

import colProps from "./types";

export default defineComponent({
  name: "YCol",
  props: colProps,
  setup(props, ctx) {
    const rowContext = inject(rowContextKey, undefined);

    const bem = createNamespace("col");
    const rowCls = computed(() => {
      const result = handlePropOrContext(props, rowContext, ["span"]);

      return [
        bem.b(),
        bem.b(`${result.span}`),
        bem.b(`pull-${props.pull}`, !!props.pull),
        bem.b(`push-${props.push}`, !!props.push),
        bem.b(`offset-${props.offset}`, !!props.offset),
      ];
    });

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (rowContext?.gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${rowContext?.gutter.value / 2}px`;
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
