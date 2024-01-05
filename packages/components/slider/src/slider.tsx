import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import sliderProps from "./types";

export default defineComponent({
  name: "YSlider",
  props: sliderProps(),
  setup(props, ctx) {
    const bem = createNamespace("slider");

    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e("wrap")}></div>
        </div>
      );
    };
  },
});
