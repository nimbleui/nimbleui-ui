import { computed, defineComponent } from "vue";
import buttonGroupProps from "./types";
import { createNamespace, isFunction } from "@yy/utils";

export default defineComponent({
  name: "YButtonGroup",
  props: buttonGroupProps(),
  setup(props, ctx) {
    const bem = createNamespace("button-group");
    const buttonGroupCls = computed(() => {
      return [bem.b()];
    });

    return () => {
      const { content } = props;
      return (
        <div class={buttonGroupCls.value}>{isFunction(content) ? content() : content || ctx.slots.default?.()}</div>
      );
    };
  },
});
