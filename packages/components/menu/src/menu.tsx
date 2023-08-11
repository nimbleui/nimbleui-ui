import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import menuProps from "./types";

export default defineComponent({
  name: "YMenu",
  props: menuProps(),
  setup(props, ctx) {
    const bem = createNamespace("menu");

    return () => {
      return <div class={bem.b()}></div>;
    };
  },
});
