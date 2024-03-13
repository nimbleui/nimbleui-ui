import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import badgeProps from "./types";
import YNumber from "@nimble-ui/components/number";
import YFlex from "@nimble-ui/components/flex";

export default defineComponent({
  name: "YBadge",
  props: badgeProps(),
  setup(props, ctx) {
    const bem = createNamespace("badge");

    return () => {
      const { count, type, dot, max } = props;
      return (
        <span class={bem.b()}>
          <YFlex
            align="center"
            justify="center"
            class={[
              bem.e("sup"),
              bem.is("dot", dot),
              bem.is(type ?? "error"),
              bem.is("multiple-words", Number(count) > 9 && !dot),
            ]}
          >
            {!dot && <YNumber count={count} max={max} />}
          </YFlex>
          {ctx.slots.default?.()}
        </span>
      );
    };
  },
});
