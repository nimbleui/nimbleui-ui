import { defineComponent } from "vue";
import { YCol } from "@yy/components";
import { formContextKey, formItemContextKey } from "@yy/tokens";
import { useParent, useChildren } from "@yy/hooks";

import formItemProp from "./types";

export default defineComponent({
  name: "YFormItem",
  props: formItemProp(),
  setup(props, ctx) {
    // 处理form组件传过的数据
    const formContext = useParent(formContextKey);
    const { linkChildren, children } = useChildren(formItemContextKey);
    linkChildren({
      props,
      events(type, value) {
        console.log(type);
        console.log(value);
      },
    });

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
