import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent } from "vue";

import numberProps from "./types";

export default defineComponent({
  name: "YNumber",
  props: numberProps(),
  setup(props, ctx) {
    const bem = createNamespace("number");

    const countRef = computed(() => {
      const { count, max } = props;
      const value = (count as number) > (max as number) ? `${max}+` : max;
      if (!value || Number(value) % 1 !== 0) return [];

      return String(value).split("");
    });

    return () => {
      return <div class={bem.b()}></div>;
    };
  },
});
