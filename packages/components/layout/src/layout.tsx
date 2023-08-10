import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import layoutProps from "./types";

export default defineComponent({
  name: "YLayout",
  props: layoutProps(),
  setup(props, ctx) {
    const bem = createNamespace("layout");

    return () => {
      return <div class={bem.b()}>{ctx.slots.default?.()}</div>;
    };
  },
});
