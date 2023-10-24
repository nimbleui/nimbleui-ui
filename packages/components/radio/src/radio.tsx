import { computed, defineComponent, ref, inject } from "vue";
import { createNamespace, isFunction } from "@nimble-ui/utils";
import { radioGroupContextKey } from "@nimble-ui/tokens";

import radioProps from "./types";

export default defineComponent({
  name: "YRadio",
  props: radioProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("radio");
    const radioRef = ref<HTMLInputElement>();
    const selfModel = ref<boolean | number | string>(false);

    const radioGroupContext = inject(radioGroupContextKey);
    const radioGroupProps = computed(() => radioGroupContext?.propsRef.value);

    const model = computed({
      get: () => radioGroupProps.value?.modelValue || props.modelValue || selfModel.value,
      set: (val) => {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
        radioGroupContext?.onChange(val);
      },
    });

    const onChange = () => {
      model.value = props.value;
      ctx.emit("change", model.value);
    };

    const checked = computed(() => model.value === props.value);
    const renderLabel = () => {
      const { label, disabled } = props;
      return <span class={[bem.e("label")]}>{(isFunction(label) ? label() : label) ?? ctx.slots.default?.()}</span>;
    };

    return () => {
      const { name, disabled, value, labelPosition = "end" } = props;
      return (
        <label class={[bem.b(), bem.is("disabled", disabled)]}>
          {labelPosition === "start" && renderLabel()}
          <span class={bem.e("input")}>
            <input
              value={value}
              ref={radioRef}
              name={name}
              type="radio"
              disabled={disabled}
              checked={checked.value}
              class={bem.m("original", "input")}
              onChange={onChange}
            />
            <span class={[bem.m("inner", "input"), bem.is("checked", checked.value)]}></span>
          </span>
          {labelPosition == "end" && renderLabel()}
        </label>
      );
    };
  },
});
