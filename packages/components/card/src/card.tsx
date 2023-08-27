import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import cardProps from "./types";

export default defineComponent({
  name: "YCard",
  props: cardProps(),
  setup(props, ctx) {
    const bem = createNamespace("card");

    return () => {
      return (
        <div class={bem.b()}>
          <div class={bem.e("header")}>
            {ctx.slots.header ? (
              ctx.slots.header()
            ) : (
              <>
                <div class={bem.m("left", "header")}>{ctx.slots.headerLeft?.()}</div>
                <div class={bem.m("center", "header")}>{ctx.slots.headerCenter?.()}</div>
                <div class={bem.m("right", "header")}>{ctx.slots.headerRight?.()}</div>
              </>
            )}
          </div>
          <div class={bem.e("content")}>{ctx.slots.default?.()}</div>
          <div class={bem.e("footer")}>{ctx.slots.footer?.()}</div>
        </div>
      );
    };
  },
});
