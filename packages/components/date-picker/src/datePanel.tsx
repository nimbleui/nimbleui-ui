import YFlex from "@nimble-ui/components/flex";
import { createNamespace } from "@nimble-ui/utils";
import { type PropType, defineComponent, reactive } from "vue";
import { equalityDate, sectionDate } from "./utils";

export default defineComponent({
  name: "DatePanel",
  props: {
    dates: {
      type: Array as PropType<Date[]>,
    },
    date: {
      type: Object as PropType<Date>,
    },
    disabledDate: {
      type: Function as PropType<(date: Date) => boolean>,
    },
    values: {
      type: Array as PropType<Array<Date>>,
      default: () => [],
    },
    isRange: Boolean,
  },
  emits: ["change", "events"],
  setup(props, ctx) {
    const bem = createNamespace("date-panel");
    const weeks = reactive(["一", "二", "三", "四", "五", "六", "日"]);

    const onClick = (date: Date) => {
      const disabled = props.disabledDate?.(date) ?? false;
      if (disabled) return;
      ctx.emit("change", date);
    };

    const setActive = (date: Date) => {
      const [start, end] = props.values;
      const endTime = end?.getTime();
      const startTime = start?.getTime();
      const flag = equalityDate(start, date, "day");
      const flag2 = equalityDate(end, date, "day");

      let i = -1;
      if (startTime > endTime) {
        i = flag ? 1 : flag2 ? 0 : -1;
      } else {
        i = flag ? 0 : flag2 ? 1 : -1;
      }

      return { i, active: flag || flag2 };
    };

    const onMouse = (type: "enter" | "leave", date: Date) => {
      ctx.emit("events", type, date);
    };

    return () => {
      const { dates, date, isRange, values } = props;
      return (
        <YFlex vertical class={bem.b()}>
          <YFlex class={bem.e("weeks")}>
            {weeks.map((week) => (
              <span class={bem.m("week", "weeks")} key={week}>
                {week}
              </span>
            ))}
          </YFlex>

          <YFlex wrap class={bem.e("dates")}>
            {dates?.map((el, index) => {
              const { active, i } = setActive(el);
              const alike = el.getMonth() != date?.getMonth();
              return (
                <div
                  key={index}
                  onClick={onClick.bind(null, el)}
                  class={[
                    bem.m("date", "dates"),
                    bem.is("alike", alike),
                    bem.is("section", sectionDate(el, ...values) && !alike),
                  ]}
                  onMouseenter={onMouse.bind(null, "enter", el)}
                  onMouseleave={onMouse.bind(null, "leave", el)}
                >
                  <span
                    class={[
                      bem.m("text", "dates"),
                      bem.is("last", isRange && i == 1),
                      bem.is("first", isRange && i == 0),
                      bem.is("disabled", props.disabledDate?.(el) ?? false),
                      bem.is("active", active && !alike),
                    ]}
                  >
                    {el.getDate()}
                  </span>
                </div>
              );
            })}
          </YFlex>
        </YFlex>
      );
    };
  },
});
