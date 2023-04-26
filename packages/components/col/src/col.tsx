import { CSSProperties, computed, defineComponent, inject } from "vue";
import { rowContextKey } from "@yy/tokens";
import colProps from "./types";

export default defineComponent({
  name: "YCol",
  props: colProps(),
  setup(props, ctx) {
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });

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
        <Component class={style} style={style.value}>
          {ctx.slots.default?.()}
        </Component>
      );
    };
  },
});
