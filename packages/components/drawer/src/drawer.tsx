import { CSSProperties, Transition, computed, defineComponent, Teleport } from "vue";
import { createNamespace, isString } from "@yy/utils";
import { YOverlay } from "@yy/components/overlay";
import { useLazyRender, useCreateIndex } from "@yy/hooks";

import drawerProps from "./types";

export default defineComponent({
  name: "YDrawer",
  props: drawerProps(),
  emits: ["update:modelValue", "close", "open", "opened", "closed"],
  setup(props, ctx) {
    const bem = createNamespace("drawer");
    const hide = (cancel?: boolean) => {
      const value = !!cancel;
      value === false && ctx.emit("close");
      ctx.emit("update:modelValue", value);
    };
    const onClose = () => {
      const { beforeClose } = props;
      beforeClose ? beforeClose(hide) : hide();
    };

    const { nextZIndex } = useCreateIndex();
    const styles = computed(() => {
      const { direction, size } = props;
      const style: CSSProperties = {};
      const value = isString(size) ? size : `${size}px`;
      if (direction === "ltr" || direction == "rtl") {
        style.width = value;
      } else {
        style.height = value;
      }
      return style;
    });

    const { lazyRender, destroy } = useLazyRender(() => props.modelValue, {
      isTransition: true,
      destroyOnClose: props.destroyOnClose,
      watchCallback(val) {
        if (val) ctx.emit("open");
      },
    });
    const renderContent = lazyRender(() => {
      const { direction, modelValue } = props;
      return (
        <div v-show={modelValue} style={styles.value} class={[bem.b(), direction]}>
          {ctx.slots.default?.()}
        </div>
      );
    });

    const afterLeave = () => {
      destroy();
      ctx.emit("closed");
    };
    const afterEnter = () => {
      ctx.emit("opened");
    };

    const zIndex = nextZIndex();
    return () => {
      const { modelValue, modal } = props;

      return (
        <Teleport to="body">
          <div style={{ zIndex: zIndex }}>
            {modal ? <YOverlay duration={0.2} disabled onClick={onClose} show={modelValue} /> : null}
            <Transition
              appear
              name={bem.name("drawer-fade")}
              onAfterEnter={afterEnter}
              onAfterLeave={afterLeave}
              v-slots={{ default: renderContent }}
            />
          </div>
        </Teleport>
      );
    };
  },
});
