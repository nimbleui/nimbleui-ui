import { defineComponent } from "vue";
import { createNamespace } from "@yy/utils";

import imageProps from "./types";

export default defineComponent({
  name: "YImage",
  props: imageProps(),
  setup(props, ctx) {
    const bem = createNamespace("image");

    return () => {
      return <div class={bem.b()}></div>;
    };
  },
});
