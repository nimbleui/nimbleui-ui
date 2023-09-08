import { CSSProperties, computed, defineComponent, provide } from "vue";
import { createNamespace, isArray } from "@nimble-ui/utils";
import { rowContextKey } from "@nimble-ui/tokens";

import rowProps from "./types";

export default defineComponent({
  name: "YRow",
  props: rowProps(),
  setup(props, { slots }) {
    const rowContext = computed(() => {
      const { span, gutter, details } = props;
      return { span, gutter: isArray(gutter) ? gutter[0] : gutter, details };
    });
    provide(rowContextKey, rowContext);

    const bem = createNamespace("row");
    const rowCls = computed(() => [bem.b(), bem.is(`justify-${props.justify}`), bem.is(`align-${props.align}`)]);

    const style = computed(() => {
      const { gutter } = props;
      const styles: CSSProperties = {};
      if (isArray(gutter)) {
        styles.rowGap = `${gutter[1]}px`;
        styles.marginRight = styles.marginLeft = `-${gutter[0] / 2}px`;
      } else {
        styles.marginRight = styles.marginLeft = `-${gutter / 2}px`;
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
