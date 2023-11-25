import { defineComponent, provide, ref } from "vue";
import { createNamespace } from "@nimble-ui/utils";

import { layoutContextKey } from "@nimble-ui/tokens";

import layoutProps from "./types";

export default defineComponent({
  name: "YLayout",
  props: layoutProps(),
  setup(props, ctx) {
    const bem = createNamespace("layout");

    const hasSider = ref(false);
    provide(layoutContextKey, {
      setSider(has) {
        hasSider.value = has;
      },
    });

    return () => {
      return <div class={[bem.b(), bem.is("sidebar", hasSider.value)]}>{ctx.slots.default?.()}</div>;
    };
  },
});
