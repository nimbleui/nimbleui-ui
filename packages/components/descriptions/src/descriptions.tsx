import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import descriptionsProps from "./types";

export default defineComponent({
  name: "YDescriptions",
  props: descriptionsProps(),
  setup(props, ctx) {
    const bem = createNamespace("descriptions");

    return () => {
      return <div class={bem.b()}></div>;
    };
  },
});
