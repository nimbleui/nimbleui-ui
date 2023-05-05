import { computed, defineComponent } from "vue";
import { isFunction, createNamespace } from "@yy/utils";
import buttonProps from "./types";

export default defineComponent({
  name: "YButton",
  props: buttonProps(),
  emits: ["click"],
  setup(props, ctx) {
    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    const bem = createNamespace("button");
    const buttonCls = computed(() => {
      return [bem.b()];
    });

    return () => {
      const { nativeType, content } = props;
      return (
        <button class={buttonCls.value} type={nativeType} onClick={onClick}>
          {isFunction(content) ? content() : content || ctx.slots.default?.()}
        </button>
      );
    };
  },
});
