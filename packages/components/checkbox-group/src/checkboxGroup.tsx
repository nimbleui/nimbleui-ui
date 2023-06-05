import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YCheckboxGroup",
  setup(props, ctx) {
    const bem = createNamespace("checkbox-group");

    return <div class={[bem.b()]}></div>;
  },
});
