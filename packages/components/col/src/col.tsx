import { CSSProperties, computed, defineComponent, inject } from "vue";
import { rowContextKey } from "@yy/tokens";
import { createNamespace, isNumber, handlePropOrContext } from "@yy/utils";

import colProps from "./types";

export default defineComponent({
  name: "YCol",
  props: colProps,
  setup(props, ctx) {
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });

    const bem = createNamespace("col");
    const rowCls = computed(() => {
      const result = handlePropOrContext(props, undefined, ["span", "offset", "pull", "push"]);

      return [
        bem.b(),
        bem.b(`${result.span}`),
        bem.b(`pull-${result.pull}`, Number(result.pull) > 0),
        bem.b(`push-${result.push}`, Number(result.push) > 0),
        bem.b(`offset-${result.offset}`, Number(result.offset) > 0),
      ];
    });

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
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
