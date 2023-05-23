import { defineComponent } from "vue";
import { YRow } from "@yy/yy-ui";
import { pick } from "@yy/utils";

import formProps from "./types";

export default defineComponent({
  name: "YForm",
  props: formProps(),
  emits: ["submit", "failed"],
  setup(props, ctx) {
    const onSubmit = (event: Event) => {
      event.preventDefault();
    };

    return () => {
      const { details } = props;
      return (
        <form onSubmit={onSubmit}>
          <YRow {...pick(props, ["span", "justify", "align", "details", "gutter", "tag"])}>
            {ctx.slots.default?.({ details })}
          </YRow>
        </form>
      );
    };
  },
});
