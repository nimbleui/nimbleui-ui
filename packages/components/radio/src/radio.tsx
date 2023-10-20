import { createNamespace, isFunction } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";

import radioProps from "./types";

export default defineComponent({
  name: "YRadio",
  props: radioProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("radio");
    const radioRef = ref<HTMLInputElement>();
    const selfModel = ref<boolean | number | string>(false);

    const model = computed({
      get: () => props.modelValue || selfModel.value,
      set: (val) => {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });

    const onChange = () => {
      model.value = props.value;
      ctx.emit("change", model.value);
    };

    return () => {
      const { label, name, disabled, value } = props;
      return (
        <label class={bem.b()}>
          <span class={bem.e("input")}>
            <input
              value={value}
              ref={radioRef}
              name={name}
              type="radio"
              disabled={disabled}
              class={bem.m("original", "input")}
              onChange={onChange}
            />
            <span class={[bem.m("inner", "input"), bem.is("checked", model.value === value)]}></span>
          </span>
          <span class={bem.e("label")}>{(isFunction(label) ? label() : label) ?? ctx.slots.default?.()}</span>
        </label>
      );
    };
  },
});
