import { computed, defineComponent, ref, inject } from "vue";
import { createNamespace } from "@nimble-ui/utils";
import { radioGroupContextKey } from "@nimble-ui/tokens";
import { useMergePropOrContext } from "@nimble-ui/hooks";

import radioProps from "./types";

export default defineComponent({
  name: "YRadio",
  props: radioProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("radio");
    const radioRef = ref<HTMLInputElement>();
    const selfModel = ref<boolean | number | string>(false);

    const radioGroupContext = inject(radioGroupContextKey, undefined);
    const newProps = useMergePropOrContext(props, radioGroupContext?.propsRef);

    const model = computed({
      get: () => newProps.value.modelValue ?? selfModel.value,
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
      const { label, disabled } = newProps.value;
      return <span class={[bem.e("label"), bem.is("disabled", !!disabled)]}>{label ?? ctx.slots.default?.()}</span>;
    };

    return () => {
      const { name, disabled, value, labelPosition = "end" } = newProps.value;

      return (
        <label class={[bem.b(), bem.is("disabled", !!disabled)]}>
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
