import { defineComponent } from "vue";
import { isFunction } from "@yy/utils";
import buttonProps from "./types";

export default defineComponent({
  name: "YButton",
  props: buttonProps(),
  emits: ["click"],
  setup(props, ctx) {
    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    return () => {
      const { nativeType, content } = props;
      return (
        <button type={nativeType} onClick={onClick}>
          {isFunction(content) ? content() : content || ctx.slots.default?.()}
        </button>
      );
    };
  },
});
