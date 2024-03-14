import { createNamespace, isFunction } from "@nimble-ui/utils";
import { CSSProperties, computed, defineComponent, onMounted, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { InputInstance, YInput } from "@nimble-ui/components/input";
import { YScrollbar } from "@nimble-ui/components/scrollbar";

import selectProps, { SelectOptions } from "./types";

export default defineComponent({
  name: "YSelect",
  props: selectProps(),
  emits: ["update:modelValue", "update:label", "change"],
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

    const show = ref(false);
    const updateShow = (val: boolean) => {
      val && (show.value = val);
    };

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

    const styles = computed<CSSProperties>(() => {
      const el = inputRef.value?.$el as HTMLElement | undefined;
      const rect = el?.getBoundingClientRect();
      return { width: `${rect?.width || 200}px` };
    });

    const onClick = (item: SelectOptions) => {
      const { labelField, field } = props;
      if (item.disabled) return;

      modelCop.value = item[field];
      labelCop.value = item[labelField];
      show.value = false;
      ctx.emit("change", item);
    };
    const onOutside = (flag: boolean) => {
      flag && (show.value = false);
    };

    const renderContent = () => {
      const { options, details, field, labelField } = props;
      return (
        <YScrollbar trigger="hover" class={bem.e("list")}>
          {options?.map((item, index) => (
            <div
              key={item[field] ?? index}
              onClick={onClick.bind(null, item)}
              class={[bem.m("item", "list"), bem.is("active", item[field] == modelCop.value)]}
            >
              {isFunction(item.renderLabel) ? item.renderLabel(details) : item.renderLabel ?? item[labelField]}
            </div>
          ))}
        </YScrollbar>
      );
    };

    return () => {
      const { disabled, name, bordered, arrowColor, placeholder, inputClass, inputStyle } = props;
      return (
        <div class={bem.b()}>
          <YTooltip
            trigger="focus"
            disabled={disabled}
            modelValue={show.value}
            contentStyle={styles.value}
            contentClass={bem.e("content")}
            transition={bem.name("zoom-in-top")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
            onOutside={onOutside}
            onUpdate:modelValue={updateShow}
          >
            {{
              default: () => (
                <YInput
                  ref={inputRef}
                  readonly
                  name={name}
                  class={inputClass}
                  style={inputStyle}
                  disabled={disabled}
                  bordered={bordered}
                  placeholder={placeholder}
                  modelValue={labelCop.value}
                >
                  {{
                    suffix: () => (
                      <span style={{ color: arrowColor }} class={[bem.e("arrow"), bem.is("positive")]}></span>
                    ),
                  }}
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
