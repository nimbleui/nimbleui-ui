import { CSSProperties, computed, defineComponent, provide } from "vue";
import rowProps from "./types";

import { rowContextKey } from "@yy/tokens";
import { createNamespace } from "@yy/utils";

export default defineComponent({
  name: "YRow",
  props: rowProps,
  setup(props, { slots }) {
    const gutter = computed(() => props.gutter);

    provide(rowContextKey, {
      gutter,
    });

    const bem = createNamespace("row");
    const rowCls = computed(() => [bem.b(), bem.is(`justify-${props.justify}`), bem.is(`align-${props.align}`)]);

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (props.gutter) {
        styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      }

      return styles;
    });

    return () => {
      const { tag: Component = "div" } = props;
      return (
        <Component class={rowCls.value} style={style.value}>
          {slots.default?.()}
        </Component>
      );
    };
  },
});
