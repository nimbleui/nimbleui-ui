import { createNamespace, isFunction } from "@nimble-ui/utils";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
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

    // 初始化设置label的值
    const initFindLabel = () => {
      const { options, labelField, field } = props;
      const val = modelCop.value;
      if (!labelCop.value && val != null) {
        const item = options?.find((el) => el[field] == val);

        if (item) {
          labelCop.value = item[labelField];
        }
      }
    };
    watch([modelCop, () => props.options], initFindLabel);
    onMounted(initFindLabel);

    const onClick = (item: SelectOptions) => {
      const { labelField, field } = props;
      modelCop.value = item[field];
      labelCop.value = item[labelField];
    };

    const renderContent = () => {
      const { options, details, field } = props;
      return (
        <YFlex vertical class={bem.e("list")}>
          {options?.map((item) => (
            <div
              onClick={onClick.bind(null, item)}
              style={{ background: item[field] == modelCop.value ? "red" : "" }}
              class={bem.m("item", "list")}
            >
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
              default: () => (
                <YInput modelValue={labelCop.value} readonly ref={inputRef}>
                  {{ suffix: () => "sss" }}
                </YInput>
              ),
              content: renderContent,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
