import { defineComponent } from "vue";
import { createNamespace } from "@nimble-ui/utils";
import YScrollbar from "@nimble-ui/components/scrollbar";

import layoutProps from "./types";

export default defineComponent({
  name: "YLayout",
  props: layoutProps(),
  setup(props, ctx) {
    const bem = createNamespace("layout");

    return () => {
      const { position, hasSidebar, contentClass, contentStyle } = props;
      return (
        <YScrollbar
          class={[bem.b()]}
          contentStyle={contentStyle}
          contentClass={[
            bem.e("warp"),
            bem.is("sidebar", hasSidebar),
            bem.is("absolute", position === "absolute"),
            contentClass,
          ]}
        >
          {ctx.slots.default?.()}
        </YScrollbar>
      );
    };
  },
});
