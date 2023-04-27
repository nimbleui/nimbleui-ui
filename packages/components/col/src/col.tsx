import { CSSProperties, computed, defineComponent, inject } from "vue";
import { rowContextKey } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";

import colProps from "./types";

export default defineComponent({
  name: "YCol",
  props: colProps(),
  setup(props, ctx) {
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });

    const bem = createNamespace("col");
    const pos = ["span", "offset", "pull", "push"] as const;
    const rowCls = computed(() => {
      return pos.reduce((acc, prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === "span") acc.push(bem.b(`${props[prop]}`));
          else if (size > 0) acc.push(bem.b(`${prop}-${props[prop]}`));
        }
        return acc;
      }, [] as string[]);
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
