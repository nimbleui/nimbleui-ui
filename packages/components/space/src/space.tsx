import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, CSSProperties, cloneVNode } from "vue";

import spaceProps from "./types";

export default defineComponent({
  name: "YSpace",
  props: spaceProps(),
  setup(props, ctx) {
    const bem = createNamespace("space");

    const styles = computed<CSSProperties>(() => {
      const { size, align, justify, compact } = props;
      return {
        alignItems: align,
        justifyContent: justify == "end" || justify == "start" ? `flex-${justify}` : justify,
        gap: isArray(size) ? `${size[0]}px ${size[1] || size[0]}px` : `${!size && !compact ? 8 : size}px`,
      };
    });

    const spaceCls = computed(() => {
      const { inline, align, wrap, vertical, compact } = props;
      return [
        bem.b(),
        bem.is("inline", inline),
        bem.is("wrap", wrap),
        bem.is(align),
        bem.is("vertical", vertical),
        bem.is("compact", compact),
      ];
    });

    return () => {
      const { slots } = ctx;
      const children = slots.default?.();

      if (!children) return null;

      const len = children.length;
      return (
        <div class={spaceCls.value} style={styles.value}>
          {children.map((child, i) =>
            cloneVNode(child, { class: [bem.e("item"), bem.is("first", !i), bem.is("last", i == len - 1)] })
          )}
        </div>
      );
    };
  },
});
