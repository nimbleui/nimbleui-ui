import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent } from "vue";

import dividerProps from "./types";

export default defineComponent({
  name: "YDivider",
  props: dividerProps(),
  setup(props, ctx) {
    const bem = createNamespace("divider");

    const dividerCls = computed(() => {
      const { direction, dashed, vertical } = props;
      return [bem.b(), bem.is(direction), bem.is("dashed", dashed), bem.is("vertical", vertical)];
    });

    return () => {
      const children = props.vertical ? null : ctx.slots.default?.();
      return <div class={dividerCls.value}>{children && <div class={bem.e("text")}>{children}</div>}</div>;
    };
  },
});
