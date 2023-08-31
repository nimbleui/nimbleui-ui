import { defineComponent } from "vue";
import { createNamespace } from "@nimble-ui/utils";
import { YScrollbar } from "@nimble-ui/components/scrollbar";

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
          contentClass={[
            bem.b(),
            bem.is("sidebar", hasSidebar),
            bem.is("absolute", position === "absolute"),
            contentClass,
          ]}
          contentStyle={contentStyle}
        >
          {ctx.slots.default?.()}
        </YScrollbar>
      );
    };
  },
});
