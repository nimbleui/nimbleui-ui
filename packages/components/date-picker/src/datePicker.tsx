import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YInput } from "@nimble-ui/components/input";
import { YFlex } from "@nimble-ui/components/flex";

import datePickerProps, { type DatePickerModelValue } from "./types";
import { getCalendar, formatModelValue } from "./utils";
import DatePanel from "./datePanel";

export default defineComponent({
  name: "YDatePicker",
  props: datePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("date-picker");
    const current = ref<Date>(new Date());

    const selfModel = ref<DatePickerModelValue>();
    const model = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (val) => {
        console.log(val);
      },
    });

    const dateList = computed(() => {
      const { modelValue, type } = props;
      const dates = formatModelValue(type, modelValue);
      return dates.map((date) => ({
        date,
        dates: getCalendar(date),
      }));
    });

    const renderContent = () => {
      return (
        <YFlex vertical class={bem.e("panel")}>
          <YFlex justify={"space-between"}>
            <div class={bem.m("left", "panel")}>
              <i class={bem.m("icon", "panel")}></i>
              <span>11111</span>
            </div>
            <div class={bem.m("right", "panel")}>
              <span>22222</span>
              <i class={bem.m("icon", "panel")}></i>
            </div>
          </YFlex>
          <div>
            {dateList.value.map((item, index) => (
              <DatePanel {...item} key={index} />
            ))}
          </div>
        </YFlex>
      );
    };

    return () => {
      const { placeholder = "" } = props;
      return (
        <div class={bem.b()}>
          <YTooltip
            maxWidth={600}
            maxHeight={600}
            contentClass={bem.e("content")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
          >
            {{
              default: () => (
                <YFlex align="center" class={bem.e("title")}>
                  <YInput
                    readonly
                    bordered={false}
                    placeholder={isArray(placeholder) ? placeholder[0] ?? "" : placeholder}
                  />
                  <span class={bem.m("icon", "title")}>
                    <i class={[bem.m("arrow", "title"), bem.is("opposite")]}></i>
                  </span>
                  <YInput
                    readonly
                    bordered={false}
                    placeholder={isArray(placeholder) ? placeholder[1] ?? "" : placeholder}
                  />
                </YFlex>
              ),
              content: renderContent,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
