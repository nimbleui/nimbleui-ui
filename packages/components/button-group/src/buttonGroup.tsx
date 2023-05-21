import { computed, defineComponent, provide, toRef } from "vue";
import buttonGroupProps from "./types";
import { createNamespace, isFunction } from "@yy/utils";
import { buttonGroupContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YButtonGroup",
  props: buttonGroupProps,
  setup(props, ctx) {
    const bem = createNamespace("button-group");
    const buttonGroupCls = computed(() => {
      return [bem.b()];
    });

    provide(buttonGroupContextKey, {
      type: toRef(props, "type"),
      shape: toRef(props, "shape"),
      disabled: toRef(props, "disabled"),
    });

    return () => {
      const { content, details } = props;
      return (
        <div class={buttonGroupCls.value}>
          {isFunction(content) ? content(details) : content || ctx.slots.default?.()}
        </div>
      );
    };
  },
});
