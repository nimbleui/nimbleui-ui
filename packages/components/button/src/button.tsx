import { computed, defineComponent, inject } from "vue";
import { isFunction, createNamespace, handlePropOrContext } from "@yy/utils";
import buttonProps from "./types";
import { buttonGroupContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YButton",
  props: buttonProps(),
  emits: ["click"],
  setup(props, ctx) {
    const buttonGroupContext = inject(buttonGroupContextKey, undefined);

    const onClick = (e: Event) => {
      if (props.disabled) return;
      ctx.emit("click", e);
    };

    const bem = createNamespace("button");
    const buttonCls = computed(() => {
      const res = handlePropOrContext(props, buttonGroupContext?.value, ["type", "shape", "disabled"]);

      return [
        bem.b(),
        bem.is("disabled", res.disabled),
        bem.is(res.type || "default", res.type !== "default"),
        bem.is(res.shape || "default", res.shape !== "default"),
      ];
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
