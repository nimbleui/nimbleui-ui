import { CSSProperties, computed, defineComponent, provide, watch } from "vue";
import rowProps from "./types";

import { rowContextKey } from "@yy/tokens";
import { createNamespace } from "@yy/utils";

export default defineComponent({
  name: "YRow",
  props: rowProps,
  setup(props, { slots }) {
    const details = computed(() => props.details);
    provide(rowContextKey, {
      span: computed(() => props.span),
      gutter: computed(() => props.gutter),
      details: computed(() => props.details),
    });

    watch(details, (val) => {
      console.log("watch", val);
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
