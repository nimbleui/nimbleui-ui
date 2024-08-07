import { CSSProperties, computed, defineComponent, ref } from "vue";
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
        const value = val ? props.checkedValue : props.uncheckedValue;
        ctx.emit("change", value);
        ctx.emit("update:modelValue", value);
      },
    });

    const onChange = () => {
      if (props.disabled || props.loading) return;
      model.value = !model.value;
    };

    const styles = computed<CSSProperties>(() => {
      const { size = "medium" } = props;
      return {
        "--y-switch-height": size == "medium" ? "22px" : size == "small" ? "16px" : "26px",
        "--y-switch-font-size":
          size == "medium" ? "var(--y-font-size)" : size == "small" ? "10px" : "var(--y-font-size)",
      };
    });

    return () => {
      const { disabled, uncheckedText, checkedText, loading } = props;
      return (
        <div
          onClick={onChange}
          class={[bem.b(), bem.is("checked", model.value), bem.is("disabled", disabled), bem.is("loading", loading)]}
          style={styles.value}
        >
          <div class={[bem.e("handle")]}></div>
          <span class={[bem.e("inner")]}>
            <span class={bem.m("checked", "inner")}>{checkedText ?? ctx.slots.checked?.()}</span>
            <span class={bem.m("unchecked", "inner")}>{uncheckedText ?? ctx.slots.unchecked?.()}</span>
          </span>
        </div>
      );
    };
  },
});
