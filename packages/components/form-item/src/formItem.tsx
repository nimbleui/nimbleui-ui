import { defineComponent } from "vue";
import { YCol } from "@yy/components";

import formItemProp from "./types";

export default defineComponent({
  name: "YFormItem",
  props: formItemProp(),
  setup(props, ctx) {
    return () => {
      const { span } = props;
      return (
        <YCol tag="label" span={span}>
          {ctx.slots.default?.()}
        </YCol>
      );
    };
  },
});
