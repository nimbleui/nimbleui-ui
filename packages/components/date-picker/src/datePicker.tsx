import { createNamespace, isArray } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { InputInstance, YInput } from "@nimble-ui/components/input";
import { YFlex } from "@nimble-ui/components/flex";

import datePickerProps, { DatePickerModelValue } from "./types";
import { getCalendar, formatDate, parseDate, calculateDate } from "./utils";
import DatePanel from "./datePanel";
import DateArrowIcon from "./arrowIcon";
import { dateIcon } from "./icons";

export default defineComponent({
  name: "YDatePicker",
  props: datePickerProps(),
  emits: ["change", "confirm", "update:modelValue", "clear"],
  setup(props, ctx) {
    const show = ref(false);
    const bem = createNamespace("date-picker");
    const isRange = computed(() => props.type.includes("Range"));
    const selfModel = ref<DatePickerModelValue>();
    const modelCop = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (val) => {
        ctx.emit("update:modelValue", val);
        selfModel.value = val;
      },
    });

    const selfValue = ref<Date[]>([]);
    watch(
      modelCop,
      (val) => {
        if (isArray(val)) {
          selfValue.value = val.map((el) => parseDate(el));
        } else if (val) {
          selfValue.value = [parseDate(val)];
        } else {
          selfValue.value = [];
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // 生成时间列表
    const selfDate = ref<Array<Date>>([]);
    const dateList = computed(() => {
      return selfDate.value.map((date) => ({
        date,
        dates: getCalendar(date),
      }));
    });

    // 切换年月日
    const onMonth = (num: 1 | -1) => {
      const date = selfDate.value[0];
      const month = date.getMonth();
      selfDate.value[0] = new Date(date.setMonth(month + num));
      if (isRange.value) {
        const date = selfDate.value[1];
        const month = date.getMonth();
        selfDate.value[1] = new Date(date.setMonth(month + num));
      }
    };
    const onYear = (num: 1 | -1) => {
      const date = selfDate.value[0];
      const year = date.getFullYear() + num;
      const month = date.getMonth();
      selfDate.value[0] = new Date(date.setFullYear(year));
      if (isRange.value) {
        selfDate.value[1] = new Date(date.setFullYear(year, month + 1));
      }
    };

    // 点击选择
    let isLast = false;
    const leftInputRef = ref<InputInstance>();
    const rightInputRef = ref<InputInstance>();
    const onSelect = (date: Date) => {
      if (isRange.value) {
        const result = isArray(selfValue.value) ? selfValue.value : [];

        if (result[0] && focusInfo.current == 1) {
          result[1] = date;
          isLast = false;
          show.value = false;
        } else if (!result[0] && focusInfo.current == 1) {
          result[1] = date;
          isLast = true;
          leftInputRef.value?.focus();
        } else if (focusInfo.current == 0 && isLast) {
          result[0] = date;
          isLast = false;
          show.value = false;
        } else {
          result[0] = date;
          rightInputRef.value?.focus();
        }

        const [start, end] = result;
        if (end && start && end.getTime() < start.getTime()) {
          result.reverse();
        }

        ctx.emit("change", result);
        selfValue.value = result as any;
        if (start && end && result.length == 2) {
          ctx.emit("confirm", result);
          modelCop.value = [result[0].getTime(), result[1].getTime()];
        }
      } else {
        ctx.emit("confirm", date);
        modelCop.value = date.getTime();
      }
    };

    // 移动选择
    const onEvents = (type: "enter" | "leave", date: Date) => {
      if (!isRange.value || !selfValue.value) return;
      const [start, end] = selfValue.value;
      const { current } = focusInfo;
      if (current == 0 && !end) return;
      if (current == 1 && !start) return;

      if (type == "enter") {
        selfValue.value[current] = date;
      } else {
        if (isArray(modelCop.value) && modelCop.value[current]) {
          selfValue.value[current] = parseDate(modelCop.value[current]);
        } else {
          selfValue.value[current] = undefined as any;
        }
      }
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
      const { value } = selfValue;
      if (isRange.value) {
        if (isArray(value) || value == undefined) {
          const d = parseDate(value?.[num]);
          const date = calculateDate(d, "month", num ? -1 : 1);

          selfDate.value = [num ? date : d, num ? d : date];
        }
      } else {
        if (isArray(value)) return;
        selfDate.value = [parseDate(value)];
      }
    };
    const onBlur = async () => {
      focusInfo.time = window.setTimeout(() => {
        focusInfo.focus = false;
      }, 200);
    };

    const onClickPanel = () => {
      clearTimeout(focusInfo.time);
      if (focusInfo.current) {
        rightInputRef.value?.focus();
      } else {
        leftInputRef.value?.focus();
      }
    };

    // 处理清楚按钮的显示隐藏
    const isShowClear = ref(false);
    const onMouse = (bool: boolean) => {
      const { value } = modelCop;
      const flag = isArray(value) ? value.length > 0 : !!value;
      isShowClear.value = bool && flag;
    };
    const onClear = (e: MouseEvent) => {
      e.stopPropagation();
      isShowClear.value = false;
      modelCop.value = undefined;
      ctx.emit("clear");
    };

    const onToggle = (bool: boolean) => {
      const checked = selfValue.value.some((el) => !el);
      if (!bool && isRange.value && checked) {
        selfValue.value = [];
      }
    };

    const renderContent = () => {
      return (
        <YFlex onClick={onClickPanel} vertical class={bem.e("panel")}>
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
              <DatePanel
                {...item}
                key={index}
                onChange={onSelect}
                isRange={isRange.value}
                values={selfValue.value}
                disabledDate={props.disabledDate}
                onEvents={onEvents}
              />
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
            v-model={show.value}
            contentClass={bem.e("content")}
            onToggle={onToggle}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
          >
            {{
              default: () => (
                <YFlex
                  align="center"
                  class={bem.e("title")}
                  onMouseenter={onMouse.bind(null, true)}
                  onMouseleave={onMouse.bind(null, false)}
                >
                  <YFlex align="center" flex="1">
                    <YInput
                      ref={leftInputRef}
                      bordered={false}
                      placeholder={isArray(placeholder) ? placeholder[0] ?? "" : placeholder}
                      onFocus={onFocus.bind(null, 0)}
                      onBlur={onBlur}
                      modelValue={formatDate(selfValue.value[0])}
                    />
                    {isRange.value && (
                      <>
                        <span class={bem.m("icon", "title")}>
                          <i class={[bem.m("arrow", "title"), bem.is("opposite")]}></i>
                        </span>
                        <YInput
                          ref={rightInputRef}
                          bordered={false}
                          placeholder={isArray(placeholder) ? placeholder[1] ?? "" : placeholder}
                          onFocus={onFocus.bind(null, 1)}
                          onBlur={onBlur}
                          modelValue={formatDate(selfValue.value[1])}
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
                  {isShowClear.value ? (
                    <i onClick={onClear} class={bem.e("clear")}></i>
                  ) : (
                    <i class={bem.e("icon")}>{dateIcon}</i>
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
