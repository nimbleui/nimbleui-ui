import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YInput } from "@nimble-ui/components/input";

import selectProps from "./types";

export default defineComponent({
  name: "YSelect",
  props: selectProps(),
  setup(props, ctx) {
    const bem = createNamespace("select");

    return () => {
      return (
        <div class={bem.b()}>
          <YTooltip>
            {{
              default: () => <YInput />,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
