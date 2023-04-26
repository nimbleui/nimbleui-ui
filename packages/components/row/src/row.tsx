import { CSSProperties, computed, defineComponent, provide } from "vue";
import rowProps from "./types";

import { rowContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YRow",
  props: rowProps(),
  setup(props, { slots }) {
    const gutter = computed(() => props.gutter);

    provide(rowContextKey, {
      gutter,
    });

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
        <Component class="y-row" style={style.value}>
          {slots.default?.()}
        </Component>
      );
    };
  },
});
