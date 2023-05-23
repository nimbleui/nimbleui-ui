import { computed, defineComponent, provide } from "vue";
import buttonGroupProps from "./types";
import { createNamespace, isFunction } from "@yy/utils";
import { buttonGroupContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YButtonGroup",
  props: buttonGroupProps(),
  setup(props, ctx) {
    const bem = createNamespace("button-group");
    const buttonGroupCls = computed(() => {
      return [bem.b()];
    });

    const buttonGroupContext = computed(() => {
      const { type, shape, disabled, details } = props;
      return { type, shape, disabled, details };
    });
    provide(buttonGroupContextKey, buttonGroupContext);

    return () => {
      const { content, details } = props;
      return (
        <div class={buttonGroupCls.value}>
          {isFunction(content) ? content(details) : content || ctx.slots.default?.({ details })}
        </div>
      );
    };
  },
});
