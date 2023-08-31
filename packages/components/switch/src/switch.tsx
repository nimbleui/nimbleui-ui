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
      model.value = !model.value;
    };

    return () => {
      return (
        <div class={[bem.b(), bem.is("checked", model.value)]} onClick={onChange}>
          <span class={[bem.e("handle")]}></span>
          <div class={bem.e("placeholder")}>
            <div>{ctx.slots.checked?.()}</div>
            <div>{ctx.slots.unchecked?.()}</div>
          </div>
          <div class={[bem.e("inner")]}>
            <span class={bem.m("checked")}>{ctx.slots.checked?.()}</span>
            <span class={bem.m("unchecked")}>{ctx.slots.unchecked?.()}</span>
          </div>
        </div>
      );
    };
  },
});
