import { computed, defineComponent, inject } from "vue";
import { isFunction, createNamespace } from "@yy/utils";
import buttonProps from "./types";
import { buttonGroupContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YButton",
  props: buttonProps,
  emits: ["click"],
  setup(props, ctx) {
    const buttonGroupContext = inject(buttonGroupContextKey, undefined);

    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    const bem = createNamespace("button");
    const buttonCls = computed(() => {
      const { details } = props;
      // buttonGroup 参数
      const _shape = props.shape || buttonGroupContext?.shape.value;
      const _type = props.type || buttonGroupContext?.type.value;
      const _disabled = props.disabled || buttonGroupContext?.disabled.value;

      const disabled = isFunction(_disabled) ? _disabled(details) : _disabled;
      const shape = isFunction(_shape) ? _shape(details) : _shape || "default";
      const type = isFunction(_type) ? _type(details) : _type || "default";
      console.log(type);
      return [bem.b(), bem.is(shape, shape !== "default"), bem.is("disabled", disabled)];
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
