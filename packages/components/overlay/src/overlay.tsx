import { CSSProperties, Transition, defineComponent, Teleport } from "vue";
import { createNamespace, isEmpty } from "@yy/utils";
import { useLazyRender } from "@yy/hooks";

import overlayProps from "./types";

export default defineComponent({
  name: "YOverlay",
  props: overlayProps(),
  emits: ["click"],
  setup(props, ctx) {
    const bem = createNamespace("overlay");

    const onClick = (e: Event) => {
      ctx.emit("click", e);
    };

    const { lazyRender } = useLazyRender(() => props.show);
    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = Object.assign({ zIndex: props.zIndex });

      if (isEmpty(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div onClick={onClick} v-show={props.show} class={bem.b()} style={style}>
          {ctx.slots.default?.()}
        </div>
      );
    });

    return () => {
      return (
        <Teleport to="body">
          <Transition name="y-fade-in" v-slots={{ default: renderOverlay }} appear />
        </Teleport>
      );
    };
  },
});
