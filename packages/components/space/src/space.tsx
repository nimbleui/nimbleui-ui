import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, CSSProperties } from "vue";

import spaceProps from "./types";

export default defineComponent({
  name: "YSpace",
  props: spaceProps(),
  setup(props, ctx) {
    const bem = createNamespace("space");

    const styles = computed<CSSProperties>(() => {
      const { size = 8, align, justify } = props;
      return {
        alignItems: align,
        justifyContent: justify == "end" || justify == "start" ? `flex-${justify}` : justify,
        gap: isArray(size) ? `${size[0]}px ${size[1] || size[0]}px` : `${size}px`,
      };
    });

    const spaceCls = computed(() => {
      const { inline, align, wrap, vertical } = props;
      return [bem.b(), bem.is("inline", inline), bem.is("wrap", wrap), bem.is(align), bem.is("vertical", vertical)];
    });

    return () => {
      const { slots } = ctx;
      const children = slots.default?.();

      if (!children) return null;

      return (
        <div class={spaceCls.value} style={styles.value}>
          {children.map((child) => (
            <div class={bem.e("item")}>{child}</div>
          ))}
        </div>
      );
    };
  },
});
