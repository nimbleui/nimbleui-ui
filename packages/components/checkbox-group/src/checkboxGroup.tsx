import { defineComponent, toRef, onMounted, watch } from "vue";
import { useChildren, useParent } from "@yy/hooks";
import { createNamespace, isBoolean, isFunction, pick } from "@yy/utils";
import { checkboxGroupContextKey, formItemContextKey } from "@yy/tokens";

import checkboxGroupProps from "./types";
import type { CheckboxFunParam } from "./types";

export default defineComponent({
  name: "YCheckboxGroup",
  props: checkboxGroupProps(),
  emits: ["change", "update:modelValue"],
  setup(props, ctx) {
    const formItemContext = useParent(formItemContextKey);
    const { linkChildren, children } = useChildren(checkboxGroupContextKey);
    const pickValue = (val: any) => pick(val, ["value", "uuId", "label", "details"]);

    /*****************处理modelValue*********************/
    const model = toRef(props, "modelValue");
    const handleInitModel = () => {
      children.forEach((child) => {
        const { value } = child.public;
        const checked = model.value?.includes(value);
        if (checked) {
          child.public.model.value = checked;
          const current = pickValue(child.public);
          handleDisabled(Object.assign(current, { checked }), checked, child.internal.uid);
        }
      });
    };
    watch(
      model,
      () => {
        handleInitModel();
      },
      { deep: true }
    );

    /*****************处理禁用复选框*********************/
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

    function handleModel(checked: boolean, value: string | number) {
      if (!model.value) return;

      const index = model.value.findIndex((v) => v === value);
      if (checked && index === -1) {
        model.value.push(value);
      } else if (!checked && index > -1) {
        model.value.splice(index, 1);
      }
      ctx.emit("update:modelValue", model.value);
    }

    linkChildren({
      props,
      model,
      change(checked, uid) {
        const child = children.find((child) => child.internal.uid === uid);
        if (!child) return;

        const current = pickValue(child.public);
        handleModel(checked, current.value);
        handleDisabled(Object.assign(current, { checked }), checked, uid);
        ctx.emit("change", checked, current);
        formItemContext?.parent.events("onChange", checked);
      },
    });

    const bem = createNamespace("checkbox-group");

    onMounted(() => {
      handleInitModel();
    });

    return () => {
      const { direction } = props;
      return <div class={[bem.b(), bem.is("horizontal", direction === "horizontal")]}>{ctx.slots.default?.()}</div>;
    };
  },
});
