import { defineComponent, nextTick, reactive, Teleport, Transition } from "vue";
import { useEventListener, useLazyRender } from "@yy/hooks";
import { createNamespace } from "@yy/utils";
import { YOverlay } from "@yy/components/overlay";

import modalProps from "./types";

export default defineComponent({
  name: "YModal",
  props: modalProps(),
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("modal");
    const { lazyRender, destroy } = useLazyRender(() => props.modelValue, {
      isTransition: true,
      destroyOnClose: props.destroyOnClose,
    });

    const mousePosition = reactive({ x: 0, y: 0 });
    useEventListener("click", (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    });

    const renderContent = lazyRender(() => {
      const { modelValue } = props;
      return (
        <div class={bem.e("body")}>
          <Transition name="y-modal-fade" onEnter={handleEnter} appear onAfterLeave={destroy}>
            <div v-show={modelValue} class={bem.e("body-content")}>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </div>
      );
    });

    const handleEnter = (element: Element) => {
      nextTick(() => {
        const el = element as HTMLElement;
        const { offsetLeft, offsetTop } = el;
        el.style.transformOrigin = `-${offsetLeft - mousePosition.x}px -${offsetTop - mousePosition.y}px`;
      });
    };

    const onClose = () => {
      ctx.emit("update:modelValue", false);
    };

    return () => {
      const { modelValue, modal } = props;

      return (
        <Teleport to="body">
          <div class={bem.b()}>
            {modal && <YOverlay disabled onClick={onClose} show={modelValue} />}
            {renderContent()}
          </div>
        </Teleport>
      );
    };
  },
});
