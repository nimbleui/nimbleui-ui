import { defineComponent, reactive, ref, Teleport, Transition } from "vue";
import { useEventListener, useLazyRender, useCreateIndex } from "@nimble-ui/hooks";
import { createNamespace, isFunction } from "@nimble-ui/utils";
import { YOverlay } from "@nimble-ui/components/overlay";
import { YButton } from "@nimble-ui/components/button";
import { YFlex } from "@nimble-ui/components/flex";

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
      destroyOnClose: true,
    });

    const mousePosition = reactive({ x: 0, y: 0 });
    useEventListener("click", (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    });

    const renderButton = () => {
      const { confirmText, cancelText, confirmType, cancelType, hideCancel, hideConfirm } = props;
      return (
        <YFlex justify="flex-end" gap={16} class={bem.m("buttons", "body")}>
          {ctx.slots.buttons ? (
            ctx.slots.buttons()
          ) : (
            <>
              {!hideCancel && (
                <YButton type={cancelType} onClick={onCancel}>
                  {cancelText}
                </YButton>
              )}
              {!hideConfirm && (
                <YButton type={confirmType} onClick={onConfirm}>
                  {confirmText}
                </YButton>
              )}
            </>
          )}
        </YFlex>
      );
    };

    const onDestroy = () => {
      destroy();
      ctx.emit("destroy");
    };

    const renderContent = lazyRender(() => {
      const { modelValue, content, details, contentStyle = "" } = props;
      return (
        <div onClick={onClose} class={bem.e("body")}>
          <Transition name="y-modal-fade" onEnter={handleEnter} appear onAfterLeave={onDestroy}>
            <div
              v-show={modelValue}
              class={bem.m("content", "body")}
              style={[{ zIndex: zIndex.value + 1 }, contentStyle]}
            >
              <span class={bem.m("close", "body")}></span>
              {content ? (isFunction(content) ? content(details) : content) : ctx.slots.default?.()}
              {renderButton()}
            </div>
          </Transition>
        </div>
      );
    });

    const handleEnter = (element: Element) => {
      setTimeout(() => {
        const el = element as HTMLElement;
        const { offsetLeft, offsetTop } = el;
        el.style.transformOrigin = `${mousePosition.x - offsetLeft}px ${mousePosition.y - offsetTop}px`;
      }, 0);
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
      const { modal, modelValue, disabled } = props;
      return (
        <Teleport disabled={disabled} to="body">
          <div class={bem.b()} style={{ zIndex: zIndex.value }}>
            {modal && <YOverlay zIndex={zIndex.value} disabled show={modelValue} />}
            {renderContent()}
          </div>
        </Teleport>
      );
    };
  },
});
