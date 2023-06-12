import { defineComponent, Teleport } from "vue";
import { createNamespace } from "@yy/utils";

import tooltipProps from "./types";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  setup(props, ctx) {
    const bem = createNamespace("tooltip");

    return () => {
      const { appendTo } = props;
      return (
        <div class={[bem.b()]}>
          <Teleport to={appendTo}></Teleport>
        </div>
      );
    };
  },
});
