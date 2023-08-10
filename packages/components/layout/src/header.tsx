import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YHeader",
  setup(props, ctx) {
    const bem = createNamespace("layout-header");

    return () => {
      return <div class={bem.b()}>{ctx.slots.default?.()}</div>;
    };
  },
});
