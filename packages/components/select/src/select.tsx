import { createNamespace, isFunction } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { InputInstance, YInput } from "@nimble-ui/components/input";
import YFlex from "@nimble-ui/components/flex";

import selectProps, { SelectOptions } from "./types";

export default defineComponent({
  name: "YSelect",
  props: selectProps(),
  emits: ["update:modelValue", "update:label"],
  setup(props, ctx) {
    const inputRef = ref<InputInstance>();
    const bem = createNamespace("select");
    const selfModel = ref<number | string>("");
    const selfLabel = ref<number | string>("");

    const modelCop = computed({
      get: () => props.modelValue ?? selfModel.value,
      set(val) {
        ctx.emit("update:modelValue", val);
        selfModel.value = val;
      },
    });
    const labelCop = computed({
      get: () => props.label ?? selfLabel.value,
      set(val) {
        ctx.emit("update:label", val);
        selfLabel.value = val;
      },
    });

    const onClick = (item: SelectOptions) => {
      console.log(item);
      inputRef.value?.focus();
    };

    const renderContent = () => {
      const { options, details } = props;
      return (
        <YFlex vertical class={bem.e("list")}>
          {options?.map((item) => (
            <div onClick={onClick.bind(null, item)} class={bem.m("item", "list")}>
              {isFunction(item.renderLabel) ? item.renderLabel(details) : item.renderLabel ?? item.label}
            </div>
          ))}
        </YFlex>
      );
    };

    return () => {
      return (
        <div class={bem.b()}>
          <YTooltip trigger="focus">
            {{
              default: () => <YInput ref={inputRef} />,
              content: renderContent,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
