import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YInput } from "@nimble-ui/components/input";
import { YFlex } from "@nimble-ui/components/flex";

import datePickerProps, { type DatePickerModelValue } from "./types";
import { getCalendar, formatModelValue, formatDate } from "./utils";
import DatePanel from "./datePanel";
import DateArrowIcon from "./arrowIcon";

export default defineComponent({
  name: "YDatePicker",
  props: datePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("date-picker");
    const isRange = computed(() => props.type.includes("Range"));

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

    const onMonthPrev = () => {
      console.log(22);
    };
    const onYearPrev = () => {
      console.log(111);
    };

    const renderContent = () => {
      return (
        <YFlex vertical class={bem.e("panel")}>
          <YFlex class={bem.e("top")} justify={"space-between"}>
            <DateArrowIcon onMonth={onMonthPrev} onYear={onYearPrev} />
            <span class={bem.m("text", "top")}>{formatDate(dateList.value[0].date, "yyyy年 M月")}</span>

            {dateList.value[1] && (
              <span class={bem.m("text", "top")}>{formatDate(dateList.value[1].date, "yyyy年 M月")}</span>
            )}
            <DateArrowIcon reverse />
          </YFlex>
          <YFlex gap={35}>
            {dateList.value.map((item, index) => (
              <DatePanel {...item} key={index} disabledDate={props.disabledDate} />
            ))}
          </YFlex>
        </YFlex>
      );
    };

    return () => {
      const { placeholder = "" } = props;
      return (
        <div class={bem.b()}>
          <YTooltip
            maxWidth={600}
            maxHeight={350}
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
                  {isRange.value && (
                    <>
                      <span class={bem.m("icon", "title")}>
                        <i class={[bem.m("arrow", "title"), bem.is("opposite")]}></i>
                      </span>
                      <YInput
                        readonly
                        bordered={false}
                        placeholder={isArray(placeholder) ? placeholder[1] ?? "" : placeholder}
                      />
                    </>
                  )}
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
