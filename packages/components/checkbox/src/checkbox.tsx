import { computed, defineComponent } from "vue";

import { createNamespace, isFunction } from "@yy/utils";
import { useParent } from "@yy/hooks";
import { formItemContextKey } from "@yy/tokens";

import checkboxProps from "./types";

export default defineComponent({
  name: "YCheckbox",
  props: checkboxProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const model = computed({
      get: () => {
        const { modelValue, value } = props;
        return modelValue === true || value === modelValue;
      },
      set: (val) => {
        ctx.emit("change", val);
      },
    });
    const bem = createNamespace("checkbox");

    const formItemContext = useParent(formItemContextKey);

    const handleChange = (event: Event) => {
      const { target } = event;
      const { checked } = target as HTMLInputElement;
      model.value = checked;
      const modelValue = checked ? props.value ?? true : false;
      ctx.emit("update:modelValue", modelValue);
      formItemContext?.parent.events("onChange", modelValue);
    };

    const details = computed(() => props.details || formItemContext?.parent.details.value);

    // 渲染侧边文案
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

    // 渲染input标签
    const inputRender = () => {
      const { shape = "square" } = props;
      return (
        <span class={[bem.e("input"), bem.is("checked", model.value), bem.is("round", shape !== "square")]}>
          <input checked={model.value} onChange={handleChange} type="checkbox" />
          <span class={[bem.e("inner")]}></span>
        </span>
      );
    };

    return () => {
      const { labelPosition } = props;
      return (
        <label class={[bem.b()]}>
          {labelPosition === "left" && labelRender()}
          {inputRender()}
          {labelPosition === "right" && labelRender()}
        </label>
      );
    };
  },
});
