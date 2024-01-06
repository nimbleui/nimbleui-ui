import { computed, defineComponent, inject } from "vue";
import { isFunction, createNamespace, handlePropOrContext } from "@nimble-ui/utils";
import buttonProps from "./types";
import { buttonGroupContextKey } from "@nimble-ui/tokens";

export default defineComponent({
  name: "YButton",
  props: buttonProps(),
  emits: ["click"],
  setup(props, ctx) {
    const buttonGroupContext = inject(buttonGroupContextKey, undefined);

    const onClick = (e: Event) => {
      if (props.disabled || props.loading) return;
      ctx.emit("click", e);
    };

    const bem = createNamespace("button");
    const buttonCls = computed(() => {
      const res = handlePropOrContext(props, buttonGroupContext?.value, ["type", "shape", "disabled", "size"]);

      return [
        bem.b(),
        bem.is("disabled", res.disabled),
        bem.is("block", props.block),
        bem.is(`type-${res.type}`, res.type !== "default"),
        bem.is(res.shape, res.shape !== "default"),
        bem.is(res.size, res.size !== "default"),
        bem.is("plain", props.plain),
        bem.is("round", props.round),
        bem.is("loading", props.loading),
      ];
    });

    return () => {
      const { nativeType, content, details, loading } = props;
      return (
        <button class={buttonCls.value} type={nativeType} onClick={onClick}>
          {loading && <i class={bem.is("loading")}></i>}
          {isFunction(content) ? content(details) : content || ctx.slots.default?.()}
        </button>
      );
    };
  },
});
