import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, type CSSProperties } from "vue";

import badgeProps from "./types";
import YNumber from "@nimble-ui/components/number";
import YFlex from "@nimble-ui/components/flex";

export default defineComponent({
  name: "YBadge",
  props: badgeProps(),
  setup(props, ctx) {
    const bem = createNamespace("badge");

    const show = computed(() => {
      const { count, showZero, hide } = props;
      if (hide) return false;
      return count == 0 ? showZero : true;
    });

    const styles = computed<CSSProperties>(() => {
      const { color, offset } = props;
      if (!offset) return {};
      const [left, top] = offset;

      return {
        background: color,
        right: `-${left}px`,
        marginTop: `${top}px`,
      };
    });
    return () => {
      const { count, type, dot, max } = props;
      return (
        <span class={bem.b()}>
          {show.value && (
            <YFlex
              align="center"
              justify="center"
              style={styles.value}
              class={[
                bem.e("sup"),
                bem.is("dot", dot),
                bem.is(type ?? "error"),
                bem.is("multiple-words", Number(count) > 9 && !dot),
              ]}
            >
              {!dot && <YNumber count={count} max={max} />}
            </YFlex>
          )}
          {ctx.slots.default?.()}
        </span>
      );
    };
  },
});
