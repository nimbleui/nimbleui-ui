import { defineComponent } from "vue";
import YFlex from "@nimble-ui/components/flex";
import { createNamespace } from "@nimble-ui/utils";

export default defineComponent({
  name: "DateArrowIcon",
  props: {
    reverse: {
      type: Boolean,
    },
  },
  emits: ["month", "year"],
  setup(props, ctx) {
    const bem = createNamespace("date-arrow");

    const onClickMonth = () => ctx.emit("month");
    const onClickYear = () => ctx.emit("year");

    return () => {
      const { reverse } = props;
      return (
        <YFlex gap={14} class={[bem.b(), bem.is("reverse", reverse)]}>
          <YFlex gap={6} onClick={onClickYear} class={bem.e("month")}>
            <i class={["icon", bem.is("opposite")]}></i>
            <i class={["icon", bem.is("opposite")]}></i>
          </YFlex>
          <i onClick={onClickMonth} class={["icon", bem.e("date"), bem.is("opposite")]}></i>
        </YFlex>
      );
    };
  },
});
