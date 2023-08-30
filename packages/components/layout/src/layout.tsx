import { defineComponent } from "vue";
import { createNamespace } from "@yy/utils";
import { YScrollbar } from "@yy/components/scrollbar";

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
            bem.is("absolute", position === "absolute"),
            bem.is("sidebar", hasSidebar),
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
