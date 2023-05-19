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
      const { shape } = props;
      return [bem.b(), bem.is(shape, shape !== "default"), bem.is("disabled", props.disabled)];
    });

    return () => {
      const { nativeType, content, details } = props;
      return (
        <button class={buttonCls.value} type={nativeType} onClick={onClick}>
          {isFunction(content) ? content(details) : content || ctx.slots.default?.()}
        </button>
      );
    };
  },
});
