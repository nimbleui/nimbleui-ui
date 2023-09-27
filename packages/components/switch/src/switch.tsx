import { computed, defineComponent, ref } from "vue";
import { createNamespace } from "@nimble-ui/utils";

import switchProps from "./types";

export default defineComponent({
  name: "YSwitch",
  props: switchProps(),
  emits: ["change", "update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("switch");
    const selfModel = ref<boolean>(false);

    const model = computed({
      get: () => {
        const { checkedValue, modelValue } = props;
        const value = modelValue ?? selfModel.value;
        return value === true || value === checkedValue;
      },
      set: (val) => {
        selfModel.value = val;
        ctx.emit("change", val);
        ctx.emit("update:modelValue", val ? props.checkedValue : props.uncheckedValue);
      },
    });

    const onChange = () => {
      if (props.disabled) return;
      model.value = !model.value;
    };

    return () => {
      const { disabled } = props;
      return (
        <div class={[bem.b(), bem.is("checked", model.value), bem.is("disabled", disabled)]} onClick={onChange}>
          <span class={[bem.e("handle")]}></span>
          <span class={[bem.e("inner")]}>
            <span class={bem.m("checked", "inner")}>{ctx.slots.checked?.()}</span>
            <span class={bem.m("unchecked", "inner")}>{ctx.slots.unchecked?.()}</span>
          </span>
        </div>
      );
    };
  },
});
