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
      const { trigger, menu } = props;
      return (
        <YTooltip trigger={trigger} transition="y-zoom-in-top" menu={menu}>
          {{
            default: () => {
              return <span class={bem.e("title")}>{ctx.slots.default?.()}</span>;
            },
            content: (item: any, index: number) => ctx.slots.dropdown?.(item, index),
          }}
        </YTooltip>
      );
    };
  },
});
