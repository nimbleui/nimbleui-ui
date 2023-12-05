import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import ColorContent from "./colorContent";

import colorPickerProps from "./types";

export default defineComponent({
  name: "YColorPicker",
  props: colorPickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("color-picker");

    return () => {
      return (
        <div class={bem.b()}>
          <YTooltip contentClass={bem.e("content")} placement="bottom-start" maxWidth={260}>
            {{
              default: () => (
                <div class={bem.e("title")}>
                  {ctx.slots.default?.() ?? <span class={bem.m("color", "title")}></span>}
                </div>
              ),
              content: () => <ColorContent></ColorContent>,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
