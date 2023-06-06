import { defineComponent } from "vue";
import { createNamespace } from "@yy/utils";
import { useChildren } from "@yy/hooks";
import { checkboxGroupContextKey } from "@yy/tokens";

import checkboxGroupProps from "./types";

export default defineComponent({
  name: "YCheckboxGroup",
  props: checkboxGroupProps(),
  setup(props, ctx) {
    const { linkChildren } = useChildren(checkboxGroupContextKey);
    linkChildren({
      props,
    });

    const bem = createNamespace("checkbox-group");

    return () => {
      return <div class={[bem.b()]}>{ctx.slots.default?.()}</div>;
    };
  },
});
