import { computed, defineComponent } from "vue";

import { createNamespace } from "@yy/utils";
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

    return () => {
      return (
        <label class={[bem.b()]}>
          <span class={[bem.e("input"), bem.is("checked", model.value)]}>
            <input checked={model.value} onChange={handleChange} type="checkbox" />
            <span class={[bem.e("inner")]}></span>
          </span>
        </label>
      );
    };
  },
});
