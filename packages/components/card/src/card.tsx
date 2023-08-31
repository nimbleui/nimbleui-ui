import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import cardProps from "./types";

export default defineComponent({
  name: "YCard",
  props: cardProps(),
  setup(props, ctx) {
    const bem = createNamespace("card");

    return () => {
      const { contentClass, contentStyle } = props;
      return (
        <div class={bem.b()}>
          {ctx.slots.header ? (
            <div class={bem.e("header")}>{ctx.slots.header()}</div>
          ) : ctx.slots.headerLeft || ctx.slots.headerCenter || ctx.slots.headerRight ? (
            <div class={bem.e("header")}>
              <div class={bem.m("left", "header")}>{ctx.slots.headerLeft?.()}</div>
              <div class={bem.m("center", "header")}>{ctx.slots.headerCenter?.()}</div>
              <div class={bem.m("right", "header")}>{ctx.slots.headerRight?.()}</div>
            </div>
          ) : null}
          <div style={contentStyle} class={[bem.e("content"), contentClass]}>
            {ctx.slots.default?.()}
          </div>
          <div class={bem.e("footer")}>{ctx.slots.footer?.()}</div>
        </div>
      );
    };
  },
});
