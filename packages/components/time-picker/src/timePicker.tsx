import { createNamespace, isNumber, isString } from "@nimble-ui/utils";
import { computed, defineComponent, nextTick, reactive, ref, shallowRef } from "vue";
import YTooltip from "@nimble-ui/components/tooltip";
import YInput from "@nimble-ui/components/input";
import YScrollbar, { ScrollbarInstance } from "@nimble-ui/components/scrollbar";
import YFlex from "@nimble-ui/components/flex";
import YButton from "@nimble-ui/components/button";

import timePickerProps from "./types";

export default defineComponent({
  name: "YTimePicker",
  props: timePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("time-picker");
    const show = ref(false);
    const selfModel = ref<string | number>();
    const modelCop = computed(() => {
      const value = props.modelValue ?? selfModel.value;
      return formatValue(value);
    });

    const items = computed(() => {
      return props.format.split(":").map((item) => {
        const length = item.indexOf("h") > -1 ? 24 : 60;
        return Array.from({ length }, (_, i) => (i <= 9 ? `0${i}` : `${i}`));
      });
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
      const res = props.format.split(":").reduce((acc, key, index) => {
        acc[key[0]] = parseInt(selectIndex[index]);
        return acc;
      }, {} as { [key: string]: number });
      let value: string | number = "";
      if (isNumber(props.modelValue)) {
        const date = new Date(props.modelValue);
        res.h && date.setHours(res.h);
        res.m && date.setMinutes(res.m);
        res.s && date.setSeconds(res.s);
        value = date.getTime();
        props["onUpdate:modelValue"]?.(value);
      } else {
        value = selectIndex.join(":");
        props["onUpdate:modelValue"]?.(value);
      }
      props.onConfirm?.({ value, ...res });
      show.value = false;
    };

    const onClear = () => {
      props["onUpdate:modelValue"]?.("");
      props.onConfirm?.({ value: "" });
      resetSite();
    };

    const resetSite = () => {
      props.format.split(":").forEach((item, i) => {
        selectIndex[i] = item.replace(/[hms]/g, "0");
      });
    };

    const scrollbarRef = shallowRef<ScrollbarInstance[]>([]);
    const getScrollbar = (el: any, index: number) => {
      scrollbarRef.value[index] = el;
    };
    const selectIndex = reactive<string[]>([]);
    const updateShow = async (val: boolean) => {
      val && (show.value = val);
      if (val && modelCop.value) {
        await nextTick();
        modelCop.value.split(":").forEach((el, i) => {
          selectIndex[i] = el;
          const value = parseInt(el);
          scrollbarRef.value[i].setScrollTop(value * 29);
        });
      } else if (val && !modelCop.value) {
        resetSite();
        await nextTick();
        scrollbarRef.value.forEach((item) => {
          item?.setScrollTop(0);
        });
      }
    };
    const onOutside = (flag: boolean) => {
      flag && (show.value = false);
    };
    const onSelectItem = (value: string, i: number) => {
      selectIndex[i] = value;
    };

    const renderContent = () => {
      return (
        <YFlex class={bem.e("panel")} vertical>
          <YFlex>
            {items.value.map((item, index) => (
              <YScrollbar
                key={index}
                trigger="hover"
                ref={(el) => getScrollbar(el, index)}
                class={[bem.e("list"), bem.is("border", index > 0)]}
              >
                {item.map((value) => (
                  <div
                    key={value}
                    onClick={onSelectItem.bind(null, value, index)}
                    class={[bem.m("item", "list"), bem.is("active", value == selectIndex[index])]}
                  >
                    {value}
                  </div>
                ))}
              </YScrollbar>
            ))}
          </YFlex>

          <YFlex align="center" justify="space-between" class={bem.e("footer")}>
            <span class={bem.m("moment", "footer")}></span>
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
            maxHeight={380}
            modelValue={show.value}
            contentClass={bem.e("content")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
            onOutside={onOutside}
            onUpdate:modelValue={updateShow}
          >
            {{
              default: () => (
                <YInput modelValue={modelCop.value} readonly placeholder={placeholder}>
                  {{
                    suffix: () =>
                      allowClear && modelCop.value ? (
                        <span onClick={onClear} class={bem.e("clear")}></span>
                      ) : (
                        ctx.slots.icon?.() ?? <span class={[bem.e("arrow"), bem.is("positive")]}></span>
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
