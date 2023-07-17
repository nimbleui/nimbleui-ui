import { CSSProperties, Transition, defineComponent, Teleport } from "vue";
import { createNamespace, isEmpty } from "@yy/utils";

import overlayProps from "./types";

export default defineComponent({
  name: "YOverlay",
  props: overlayProps(),
  setup(props, ctx) {
    const bem = createNamespace("overlay");

    const renderOverlay = () => {
      const style: CSSProperties = Object.assign({ zIndex: props.zIndex });

      if (isEmpty(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div v-show={props.show} class={bem.b()} style={style}>
          {ctx.slots.default?.()}
        </div>
      );
    };

    return () => {
      return (
        <Teleport to="body">
          <Transition name="y-fade-in" v-slots={{ default: renderOverlay }} appear />
        </Teleport>
      );
    };
  },
});
