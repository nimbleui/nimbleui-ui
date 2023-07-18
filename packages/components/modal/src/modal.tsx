import { defineComponent } from "vue";

import modalProps from "./types";
import { useLazyRender } from "@yy/hooks";
import { YOverlay } from "@yy/yy-ui";

export default defineComponent({
  name: "YModal",
  props: modalProps(),
  setup(props, ctx) {
    const { lazyRender, destroy } = useLazyRender(() => props.modelValue, {
      isTransition: true,
      destroyOnClose: props.destroyOnClose,
    });

    const renderContent = lazyRender(() => {
      const { modelValue } = props;
      return <div v-show={modelValue}>{ctx.slots.default?.()}</div>;
    });

    return () => {
      return (
        <div>
          <YOverlay />
        </div>
      );
    };
  },
});
