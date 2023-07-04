import { defineComponent, Teleport } from "vue";
import { createNamespace } from "@yy/utils";
import YTrigger from "./trigger";

import tooltipProps from "./types";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  setup(props, ctx) {
    const bem = createNamespace("tooltip");

    const onToggle = (e: Event, toggle: boolean) => {
      console.log("执行");
      console.log(toggle);
    };

    return () => {
      const { appendTo, trigger } = props;
      return (
        <div class={[bem.b()]}>
          <YTrigger trigger={trigger} onToggle={onToggle}>
            {ctx.slots.default?.()}
          </YTrigger>
          <Teleport to={appendTo}></Teleport>
        </div>
      );
    };
  },
});
