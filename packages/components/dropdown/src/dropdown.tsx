import { YTooltip } from "@yy/components/tooltip";
import { createNamespace } from "@yy/utils";
import { defineComponent } from "vue";

import dropdownProps from "./types";

export default defineComponent({
  name: "YDropdown",
  props: dropdownProps(),
  setup(props, ctx) {
    const bem = createNamespace("dropdown");

    return () => {
      const { trigger } = props;
      return (
        <YTooltip trigger={trigger} transition="y-zoom-in-top">
          {{
            default: () => {
              return <span class={bem.e("title")}>{ctx.slots.default?.()}</span>;
            },
            content: () => {
              return <div class={bem.e("content")}>{ctx.slots.dropdown?.()}</div>;
            },
          }}
        </YTooltip>
      );
    };
  },
});
