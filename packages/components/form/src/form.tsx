import { ComponentInternalInstance, defineComponent, provide } from "vue";
import { formContextKey } from "@yy/tokens";
import { YRow } from "@yy/components";
import { pick } from "@yy/utils";

import formProps from "./types";

export default defineComponent({
  name: "YForm",
  props: formProps(),
  emits: ["submit", "failed"],
  setup(props, ctx) {
    const internalChildren: ComponentInternalInstance[] = [];
    provide(formContextKey, {
      link(child) {
        child && internalChildren.push(child);
        console.log(internalChildren);
      },
      unLink(child) {
        if (child) {
          const index = internalChildren.indexOf(child);
          if (index > -1) {
            internalChildren.splice(index, 1);
          }
        }
      },
    });

    // 获取所有form组件的value
    const getValues = () => {
      return internalChildren.reduce<Record<string, unknown>>((acc, child) => {
        const proxy = child.proxy as any;
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
