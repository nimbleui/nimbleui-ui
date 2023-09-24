import { defineComponent } from "vue";
import { createNamespace } from "@nimble-ui/utils";

import layoutProps from "./types";

export default defineComponent({
  name: "YLayout",
  props: layoutProps(),
  setup(props, ctx) {
    const bem = createNamespace("layout");

    return () => {
      const { position, hasSidebar, contentClass, contentStyle } = props;
      return (
        <div
          class={[bem.b(), bem.is("sidebar", hasSidebar), bem.is("absolute", position === "absolute"), contentClass]}
          style={contentStyle}
        >
          {ctx.slots.default?.()}
        </div>
      );
    };
  },
});
