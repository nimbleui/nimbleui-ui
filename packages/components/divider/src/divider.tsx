import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent } from "vue";

import dividerProps from "./types";

export default defineComponent({
  name: "YDivider",
  props: dividerProps(),
  setup(props, ctx) {
    const bem = createNamespace("divider");

    const dividerCls = computed(() => {
      const { direction } = props;
      return [bem.b(), bem.is(direction)];
    });

    return () => {
      return (
        <div class={dividerCls.value}>
          <div class={bem.e("text")}>{ctx.slots.default?.()}</div>
        </div>
      );
    };
  },
});
