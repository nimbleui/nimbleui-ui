import { defineComponent, nextTick, reactive, ref, Teleport, Transition } from "vue";
import { useEventListener, useLazyRender, useCreateIndex } from "@yy/hooks";
import { createNamespace, isFunction } from "@yy/utils";
import { YOverlay } from "@yy/components/overlay";
import { YButton } from "@yy/components/button";

import modalProps, { type ModalAction } from "./types";

export default defineComponent({
  name: "YModal",
  props: modalProps(),
  emits: ["update:modelValue", "confirm", "close", "destroy"],
  setup(props, ctx) {
    const bem = createNamespace("modal");

    const { nextZIndex } = useCreateIndex();
    const zIndex = ref(props.zIndex || nextZIndex());

    const { lazyRender, destroy } = useLazyRender(() => props.modelValue, {
      isTransition: true,
      destroyOnClose: props.destroyOnClose,
    });

    const mousePosition = reactive({ x: 0, y: 0 });
    useEventListener("click", (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    });

    const renderButton = () => {
      const { confirmText, cancelText } = props;
      return (
        <>
          <YButton onClick={onCancel}>{cancelText}</YButton>
          <YButton onClick={onConfirm}>{confirmText}</YButton>
        </>
      );
    };

    const onDestroy = () => {
      destroy();
      ctx.emit("destroy");
    };

    const renderContent = lazyRender(() => {
      const { modelValue, content, details } = props;
      return (
        <Transition name="y-modal-fade" onEnter={handleEnter} appear onAfterLeave={onDestroy}>
          <div onClick={onClose} v-show={modelValue} class={bem.e("body")}>
            <div style={{ zIndex: zIndex.value + 1 }} class={bem.e("body-content")}>
              {content ? (isFunction(content) ? content(details) : content) : ctx.slots.default?.()}
              {renderButton()}
            </div>
          </div>
        </Transition>
      );
    });

    const handleEnter = (element: Element) => {
      nextTick(() => {
        const el = element as HTMLElement;
        const { offsetLeft, offsetTop } = el;
        el.style.transformOrigin = `-${offsetLeft - mousePosition.x}px -${offsetTop - mousePosition.y}px`;
      });
    };

    const emitHandle = (type: ModalAction, value = false) => {
      const { beforeClose } = props;
      if (beforeClose) {
        beforeClose((cancel) => ctx.emit("update:modelValue", cancel || false), type);
      } else {
        ctx.emit("update:modelValue", value);
        const emitName = type === "confirm" ? "confirm" : "close";
        ctx.emit(emitName, type);
      }
    };

    const onClose = (event: Event) => {
      const el = event.target as HTMLElement;
      if (el.className.indexOf(bem.e("body")) > -1) {
        emitHandle("close");
      }
    };

    const onConfirm = () => emitHandle("confirm");
    const onCancel = () => emitHandle("cancel");

    return () => {
      const { modal, modelValue } = props;
      return (
        <Teleport to="body">
          <div class={bem.b()}>
            {modal && <YOverlay zIndex={zIndex.value} disabled show={modelValue} />}
            {renderContent()}
          </div>
        </Teleport>
      );
    };
  },
});
