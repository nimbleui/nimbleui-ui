import { computed, defineComponent, provide, toRef } from "vue";
import { createNamespace } from "@nimble-ui/utils";
import { radioGroupContextKey } from "@nimble-ui/tokens";

import radioGroupProps from "./types";

export default defineComponent({
  name: "YRadioGroup",
  props: radioGroupProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("radio-group");

    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        ctx.emit("update:modelValue", val);
      },
    });

    const onChange = (value: string | number | boolean) => {
      model.value = value;
      ctx.emit("change", value);
    };

    provide(radioGroupContextKey, {
      onChange,
      modelValue: toRef(props, "modelValue"),
    });

    return () => {
      return <div class={bem.b()}>{ctx.slots.default?.()}</div>;
    };
  },
});
