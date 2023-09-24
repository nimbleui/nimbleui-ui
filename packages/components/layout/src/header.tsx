import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YHeader",
  setup(props, ctx) {
    const bem = createNamespace("layout-header");

    return () => {
      return <header class={bem.b()}>{ctx.slots.default?.()}</header>;
    };
  },
});
