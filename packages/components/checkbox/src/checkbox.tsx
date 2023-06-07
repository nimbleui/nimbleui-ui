import { computed, defineComponent, ref } from "vue";

import { createNamespace, handlePropOrContext, isFunction } from "@yy/utils";
import { useParent, useExpose } from "@yy/hooks";
import { checkboxGroupContextKey } from "@yy/tokens";

import checkboxProps, { CheckboxExpose } from "./types";

export default defineComponent({
  name: "YCheckbox",
  props: checkboxProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const selfModel = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const bem = createNamespace("checkbox");
    const checkboxGroupContext = useParent(checkboxGroupContextKey);
    const details = computed(() => props.details || checkboxGroupContext?.parent.props.details);

    const model = computed({
      get: () => {
        const { modelValue, value } = props;
        const _value = modelValue ?? selfModel.value;
        return _value === true || value === _value;
      },
      set: (val) => {
        selfModel.value = val;
        ctx.emit("change", val);
      },
    });

    /*****************复选框切换*********************/
    const handleChange = (event: Event) => {
      const { target } = event;
      const { checked } = target as HTMLInputElement;
      model.value = checked;
      const modelValue = checked ? props.value ?? true : false;
      ctx.emit("update:modelValue", modelValue);
      checkboxGroupContext?.parent.change(checked, checkboxGroupContext?.uid);
    };

    /*****************处理禁用复选框*********************/
    const groupDisabled = ref<boolean>(false);
    const handleDisabled = (bool: boolean) => (groupDisabled.value = bool);
    const disabled = computed(() => {
      const res = handlePropOrContext(props, undefined, ["disabled"]);
      const disabled = checkboxGroupContext?.parent.props.disabled;
      if (typeof disabled === "boolean" && disabled) {
        return true;
      }
      return groupDisabled.value || res.disabled;
    });

    /*****************渲染侧边文案*********************/
    const labelRender = () => {
      const { label } = props;
      return (
        (label || ctx.slots.default) && (
          <span class={[bem.e("label")]}>
            {isFunction(label) ? label(details.value) : label ?? ctx.slots.default?.(details.value)}
          </span>
        )
      );
    };

    /*****************渲染input标签*********************/
    const inputRender = () => {
      const { shape = "square" } = props;
      return (
        <span class={[bem.e("input"), bem.is("checked", model.value), bem.is("round", shape !== "square")]}>
          <input
            ref={inputRef}
            type="checkbox"
            checked={model.value}
            disabled={disabled.value}
            onChange={handleChange}
          />
          <span class={[bem.e("inner")]}></span>
        </span>
      );
    };

    useExpose<CheckboxExpose>({
      model,
      handleDisabled,
    });

    return () => {
      const { labelPosition } = props;
      return (
        <label class={[bem.b(), bem.is("disabled", disabled.value)]}>
          {labelPosition === "left" && labelRender()}
          {inputRender()}
          {labelPosition === "right" && labelRender()}
        </label>
      );
    };
  },
});
