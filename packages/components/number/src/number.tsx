import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent } from "vue";

import SingleNumber from "./single-number";
import numberProps from "./types";
import YFlex from "@nimble-ui/components/flex";

export default defineComponent({
  name: "YNumber",
  props: numberProps(),
  setup(props) {
    const bem = createNamespace("number");

    const countRef = computed(() => {
      const { count, max } = props;
      if (!count || Number(count) % 1 !== 0) return [];

      const value = (count as number) > (max as number) ? max : count;
      return String(value).split("");
    });

    return () => {
      const { numberClass, numberStyle, gap, count, max } = props;
      return (
        <YFlex class={bem.b()} gap={gap}>
          {countRef.value.map((value, i) => {
            return (
              <div key={countRef.value.length - i} class={[bem.e("scroll"), numberClass]} style={numberStyle}>
                <SingleNumber value={value} count={Number(props.count)} />
              </div>
            );
          })}
          {Number(count) > Number(max) && (
            <div class={[bem.e("scroll"), numberClass]} style={numberStyle}>
              <span class={bem.e("only")}>
                <span class={[bem.m("unit", "only"), bem.is("current")]}>+</span>
              </span>
            </div>
          )}
        </YFlex>
      );
    };
  },
});
