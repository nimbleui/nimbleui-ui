import YFlex from "@nimble-ui/components/flex";
import { createNamespace } from "@nimble-ui/utils";
import { type PropType, defineComponent, reactive } from "vue";

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
  },
  emits: ["change"],
  setup(props, ctx) {
    const bem = createNamespace("date-panel");
    const weeks = reactive(["一", "二", "三", "四", "五", "六", "日"]);

    const onClick = (date: Date) => {
      const disabled = props.disabledDate?.(date) ?? false;
      if (disabled) return;
      ctx.emit("change", date);
    };

    return () => {
      const { dates, date } = props;
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
            {dates?.map((el, index) => (
              <div
                key={index}
                onClick={onClick.bind(null, el)}
                class={[
                  bem.m("date", "dates"),
                  bem.is("alike", el.getMonth() != date?.getMonth()),
                  bem.is("disabled", props.disabledDate?.(el) ?? false),
                ]}
              >
                {el.getDate()}
              </div>
            ))}
          </YFlex>
        </YFlex>
      );
    };
  },
});
