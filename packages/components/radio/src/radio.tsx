import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";

import radioProps from "./types";

export default defineComponent({
  name: "YRadio",
  props: radioProps(),
  setup(props, ctx) {
    const bem = createNamespace("radio");
    const radioRef = ref<HTMLInputElement>();

    return () => {
      const { label, name, disabled, value, checked } = props;
      return (
        <label class={bem.b()}>
          <span class={bem.e("input")}>
            <input
              checked={checked}
              value={value}
              ref={radioRef}
              name={name}
              type="radio"
              disabled={disabled}
              class={bem.m("original", "input")}
            />
            <span class={bem.m("inner", "input")}></span>
          </span>
          <span class={bem.e("label")}>{label ?? ctx.slots.default?.()}</span>
        </label>
      );
    };
  },
});
