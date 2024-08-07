import { createNamespace, isFunction } from "@nimble-ui/utils";
import { CSSProperties, ComponentPublicInstance, computed, defineComponent, onMounted, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import YFlex from "@nimble-ui/components/flex";
import { YScrollbar } from "@nimble-ui/components/scrollbar";
import YPopper from "@nimble-ui/components/popper";

import selectProps, { SelectOptions } from "./types";
import { useMouseInOut } from "@nimble-ui/hooks";

export default defineComponent({
  name: "YSelect",
  props: selectProps(),
  emits: ["update:modelValue", "update:label", "change"],
  setup(props, ctx) {
    const bem = createNamespace("select");
    const selfModel = ref<number | string>("");
    const selfLabel = ref<number | string>("");
    const show = ref(false);

    // multiple

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
      if (val != null) {
        const item = options?.find((el) => el[field] == val);

        if (item) {
          labelCop.value = item[labelField];
        }
      } else {
        labelCop.value = "";
      }
    };
    watch([modelCop, () => props.options], initFindLabel);
    onMounted(initFindLabel);

    const onClick = (item: SelectOptions) => {
      const { labelField, field } = props;
      if (item.disabled) return;

      modelCop.value = item[field];
      labelCop.value = item[labelField];
      show.value = false;
      ctx.emit("change", item);
    };

    const onClear = (e: Event) => {
      e.stopPropagation();
      selfModel.value = "";
      selfLabel.value = "";
      ctx.emit("update:label", "");
      ctx.emit("update:modelValue", "");
    };

    const titleRef = ref<ComponentPublicInstance>();
    const { isEnter } = useMouseInOut(titleRef);
    const styles = computed<CSSProperties>(() => {
      const el = titleRef.value?.$el as HTMLElement | undefined;
      const rect = el?.getBoundingClientRect();
      return { width: `${rect?.width || 200}px` };
    });

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
      const { disabled, bordered, arrowColor, placeholder, inputClass, inputStyle, allowClear } = props;
      return (
        <div class={bem.b()}>
          <YPopper
            disabled={disabled}
            v-model={show.value}
            contentStyle={styles.value}
            contentClass={bem.e("content")}
            transition={bem.name("zoom-in-top")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
          >
            {{
              trigger: () => (
                <YFlex
                  ref={titleRef}
                  class={[
                    bem.e("title"),
                    bem.is("disabled", disabled),
                    bem.is("focus", show.value),
                    bem.is("bordered", bordered),
                    inputClass,
                  ]}
                  align="center"
                  style={inputStyle}
                >
                  {labelCop.value ? (
                    <div class={bem.m("inner", "title")}>
                      <span>{labelCop.value}</span>
                    </div>
                  ) : (
                    <span class={[bem.m("inner", "title"), bem.is("placeholder")]}>{placeholder}</span>
                  )}

                  {allowClear && labelCop.value && isEnter.value ? (
                    <span onClick={onClear} class={bem.e("clear")}></span>
                  ) : (
                    <span style={{ color: arrowColor }} class={[bem.e("arrow"), bem.is("positive")]}></span>
                  )}
                </YFlex>
              ),
              default: renderContent,
            }}
          </YPopper>
        </div>
      );
    };
  },
});
