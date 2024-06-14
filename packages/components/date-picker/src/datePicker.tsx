import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YInput } from "@nimble-ui/components/input";
import { YFlex } from "@nimble-ui/components/flex";

import datePickerProps from "./types";
import { getCalendar, formatDate, parseDate, calculateDate } from "./utils";
import DatePanel from "./datePanel";
import DateArrowIcon from "./arrowIcon";

const date = parseDate("20210102T012345");
console.log(date);
export default defineComponent({
  name: "YDatePicker",
  props: datePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("date-picker");
    const isRange = computed(() => props.type.includes("Range"));

    const selfModel = ref<Array<Date>>([]);

    const dateList = computed(() => {
      return selfModel.value.map((date) => ({
        date,
        dates: getCalendar(date),
      }));
    });

    const onMonth = (num: 1 | -1) => {
      const date = selfModel.value[0];
      const month = date.getMonth();
      selfModel.value[0] = new Date(date.setMonth(month + num));
      if (isRange.value) {
        selfModel.value[1] = new Date(date.setMonth(month + num + 1));
      }
    };
    const onYear = (num: 1 | -1) => {
      const date = selfModel.value[0];
      const year = date.getFullYear() + num;
      const month = date.getMonth();
      selfModel.value[0] = new Date(date.setFullYear(year));
      if (isRange.value) {
        selfModel.value[1] = new Date(date.setFullYear(year, month + 1));
      }
    };

    const onSelect = (date: Date) => {
      console.log(date);
    };

    const focusInfo = reactive({
      current: 0,
      focus: false,
      time: 0,
    });
    const onFocus = (num: number) => {
      clearTimeout(focusInfo.time);
      focusInfo.current = num;
      if (focusInfo.focus) return;

      focusInfo.focus = true;
      const { modelValue } = props;
      if (isRange.value) {
        if (isArray(modelValue) || modelValue == undefined) {
          const d = parseDate(modelValue?.[num]);
          const date = calculateDate(d, "month", num ? -1 : 1);

          selfModel.value = [num ? date : d, num ? d : date];
        }
      } else {
        if (isArray(modelValue)) return;
        selfModel.value = [parseDate(modelValue)];
      }
    };
    const onBlur = async () => {
      focusInfo.time = window.setTimeout(() => {
        focusInfo.focus = false;
      }, 80);
    };

    const renderContent = () => {
      return (
        <YFlex vertical class={bem.e("panel")}>
          <YFlex class={bem.e("top")} justify={"space-between"}>
            <DateArrowIcon onMonth={onMonth.bind(null, -1)} onYear={onYear.bind(null, -1)} />
            <span class={bem.m("text", "top")}>{formatDate(dateList.value[0].date, "yyyy年 M月")}</span>

            {dateList.value[1] && (
              <span class={bem.m("text", "top")}>{formatDate(dateList.value[1].date, "yyyy年 M月")}</span>
            )}
            <DateArrowIcon reverse onMonth={onMonth.bind(null, 1)} onYear={onYear.bind(null, 1)} />
          </YFlex>
          <YFlex gap={35}>
            {dateList.value.map((item, index) => (
              <DatePanel {...item} key={index} onChange={onSelect} disabledDate={props.disabledDate} />
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
                    bordered={false}
                    placeholder={isArray(placeholder) ? placeholder[0] ?? "" : placeholder}
                    onFocus={onFocus.bind(null, 0)}
                    onBlur={onBlur}
                  />
                  {isRange.value && (
                    <>
                      <span class={bem.m("icon", "title")}>
                        <i class={[bem.m("arrow", "title"), bem.is("opposite")]}></i>
                      </span>
                      <YInput
                        bordered={false}
                        placeholder={isArray(placeholder) ? placeholder[1] ?? "" : placeholder}
                        onFocus={onFocus.bind(null, 1)}
                        onBlur={onBlur}
                      />
                    </>
                  )}
                  {focusInfo.focus && (
                    <i
                      class={bem.m("bar", "title")}
                      style={{ transform: `translate(calc((100% + 20px) * ${focusInfo.current}))` }}
                    ></i>
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
