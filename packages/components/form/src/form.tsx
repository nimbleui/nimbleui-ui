import { defineComponent } from "vue";
import { formContextKey } from "@yy/tokens";
import { YRow } from "@yy/components";
import { pick } from "@yy/utils";
import { useChildren } from "@yy/hooks";

import formProps from "./types";

export default defineComponent({
  name: "YForm",
  props: formProps(),
  emits: ["submit", "failed"],
  setup(props, ctx) {
    const { linkChildren, children } = useChildren(formContextKey);
    linkChildren({ props });

    // 获取所有form组件的value
    const getValues = () => {
      return children.reduce<Record<string, unknown>>((acc, child) => {
        const proxy = child.public;
        if (proxy?.name) {
          acc[proxy.name] = proxy.formValue.value;
        }
        return acc;
      }, {});
    };

    const submit = () => {
      const values = getValues();
      ctx.emit("submit", values);
    };
    const onSubmit = (event: Event) => {
      event.preventDefault();
      submit();
    };

    return () => {
      const { details } = props;
      return (
        <form onSubmit={onSubmit}>
          <YRow {...pick(props, ["span", "justify", "align", "details", "gutter"])}>
            {ctx.slots.default?.({ details })}
          </YRow>
        </form>
      );
    };
  },
});
