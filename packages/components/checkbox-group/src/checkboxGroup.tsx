import { defineComponent } from "vue";
import { useChildren } from "@yy/hooks";
import { createNamespace, isBoolean, isFunction, pick } from "@yy/utils";
import { checkboxGroupContextKey } from "@yy/tokens";

import checkboxGroupProps from "./types";
import type { CheckboxFunParam } from "./types";

export default defineComponent({
  name: "YCheckboxGroup",
  props: checkboxGroupProps(),
  setup(props, ctx) {
    const { linkChildren, children } = useChildren(checkboxGroupContextKey);
    const pickValue = (val: any) => pick(val, ["value", "uuId", "label", "details"]);

    // 处理禁用复选框
    function handleDisabled(current: CheckboxFunParam, checked: boolean, uid?: number) {
      const { disabled } = props;
      if (disabled == null) return;

      children.forEach((child) => {
        if (child.internal.uid === uid) return;
        const data = pickValue(child.public);
        const { handleDisabled } = child.public;

        if (isFunction(disabled)) {
          disabled(current, data, handleDisabled);
        } else if (!isBoolean(disabled)) {
          const ids = disabled[current.uuId];
          if (ids?.includes(data.uuId)) {
            handleDisabled(checked);
          }
        }
      });
    }

    linkChildren({
      props,
      change(checked, uid) {
        const child = children.find((child) => child.internal.uid === uid);
        const current = pickValue(child?.public);
        handleDisabled(Object.assign(current, { checked }), checked, uid);
      },
    });

    const bem = createNamespace("checkbox-group");

    return () => {
      const { direction } = props;
      return <div class={[bem.b(), bem.is("horizontal", direction === "horizontal")]}>{ctx.slots.default?.()}</div>;
    };
  },
});