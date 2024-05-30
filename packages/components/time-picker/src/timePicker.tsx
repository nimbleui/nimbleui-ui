import { createNamespace, isString } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import YTooltip from "@nimble-ui/components/tooltip";
import YInput from "@nimble-ui/components/input";
import YScrollbar from "@nimble-ui/components/scrollbar";
import YFlex from "@nimble-ui/components/flex";
import YButton from "@nimble-ui/components/button";

import timePickerProps from "./types";

export default defineComponent({
  name: "YTimePicker",
  props: timePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("time-picker");

    const items = computed(() => {
      return props.format.split(":").map((item) => {
        const length = item.indexOf("h") > -1 ? 24 : 60;
        return Array.from({ length }, (_, i) => (i <= 9 ? `0${i}` : `${i}`));
      });
    });

    const selfModel = ref<string | number>();
    const modelCop = computed(() => {
      const value = props.modelValue ?? selfModel.value;
      return formatValue(value);
    });

    const formatValue = (value?: string | number) => {
      if (!value) return "";
      if (isString(value)) return value;

      let { format } = props;
      const date = new Date(value);
      const obj = {
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (const k in obj) {
        const result = new RegExp(`(${k})`).exec(format)?.[1];
        const value = obj[k as keyof typeof obj] + "";
        if (result) {
          format = format.replace(result, value.padStart(2, "0"));
        }
      }
      return format;
    };

    const onConfirm = () => {
      console.log(222);
    };

    const onClear = () => {
      console.log(111);
    };

    const selectIndex = ref<number[]>([]);
    const onToggle = (val: boolean) => {
      if (val && modelCop.value) {
        selectIndex.value = modelCop.value.split(":").map((item) => parseInt(item));
      }
    };

    const renderContent = () => {
      return (
        <YFlex class={bem.e("panel")} vertical>
          <YFlex>
            {items.value.map((item, index) => (
              <YScrollbar trigger="hover" key={index} class={[bem.e("list"), bem.is("border", index > 0)]}>
                {item.map((value, i) => (
                  <div class={[bem.m("item", "list"), bem.is("active", i == selectIndex.value[index])]} key={i}>
                    {value}
                  </div>
                ))}
              </YScrollbar>
            ))}
          </YFlex>

          <YFlex align="center" justify="space-between" class={bem.e("footer")}>
            <span class={bem.m("moment", "footer")}>此刻</span>
            <YButton onClick={onConfirm} type={"primary"} size={"small"}>
              确定
            </YButton>
          </YFlex>
        </YFlex>
      );
    };

    return () => {
      const { allowClear, placeholder } = props;
      return (
        <div class={bem.b()}>
          <YTooltip
            trigger="focus"
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
            contentClass={bem.e("content")}
            maxHeight={380}
            onToggle={onToggle}
          >
            {{
              default: () => (
                <YInput modelValue={modelCop.value} readonly placeholder={placeholder}>
                  {{
                    suffix: () =>
                      allowClear ? (
                        <span onClick={onClear} class={bem.e("clear")}></span>
                      ) : (
                        <span class={[bem.e("arrow"), bem.is("positive")]}></span>
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
