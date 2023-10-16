import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import flexProps from "./types";

export default defineComponent({
  name: "YFlex",
  props: flexProps(),
  setup(props, ctx) {
    const bem = createNamespace("flex");

    return () => {
      const { tag: Component, vertical, justify, align, wrap } = props;
      return (
        <Component
          class={[
            bem.b(),
            bem.is("wrap", wrap),
            bem.is(`align-${align}`),
            bem.is("vertical", vertical),
            bem.is(`justify-${justify}`),
          ]}
        >
          {ctx.slots.default?.()}
        </Component>
      );
    };
  },
});
