import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import layoutProps from "./types";

export default defineComponent({
  name: "YLayout",
  props: layoutProps(),
  setup(props, ctx) {
    const bem = createNamespace("layout");

    return () => {
      const { position, hasSidebar } = props;
      return (
        <div class={[bem.b(), bem.is("absolute", position === "absolute"), bem.is("sidebar", hasSidebar)]}>
          {ctx.slots.default?.()}
        </div>
      );
    };
  },
});
