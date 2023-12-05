import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorContent",
  setup(props, ctx) {
    const bem = createNamespace("color-content");
    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e("panel")}></div>
        </div>
      );
    };
  },
});
