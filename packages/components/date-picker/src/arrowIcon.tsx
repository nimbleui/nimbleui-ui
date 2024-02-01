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
  emits: ["month", "date"],
  setup(props, ctx) {
    const bem = createNamespace("date-arrow");

    const onClickMonth = () => ctx.emit("month");
    const onClickDate = () => ctx.emit("date");

    return () => {
      const { reverse } = props;
      return (
        <YFlex gap={14} class={[bem.b(), bem.is("reverse", reverse)]}>
          <YFlex gap={6} onClick={onClickMonth} class={bem.e("month")}>
            <i class={["icon", bem.is("opposite")]}></i>
            <i class={["icon", bem.is("opposite")]}></i>
          </YFlex>
          <i onClick={onClickDate} class={["icon", bem.e("date"), bem.is("opposite")]}></i>
        </YFlex>
      );
    };
  },
});
