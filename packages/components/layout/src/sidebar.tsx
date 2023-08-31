import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YSidebar",
  setup(props, ctx) {
    const bem = createNamespace("layout-sidebar");

    return () => {
      return <div class={bem.b()}>{ctx.slots.default?.()}</div>;
    };
  },
});
