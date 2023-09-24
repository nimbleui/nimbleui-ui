import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YContent",
  setup(props, ctx) {
    const bem = createNamespace("layout-content");
    return () => {
      return <main class={bem.b()}>{ctx.slots.default?.()}</main>;
    };
  },
});
