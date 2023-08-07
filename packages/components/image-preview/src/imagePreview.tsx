import { defineComponent, provide, reactive, ref, Teleport, Transition } from "vue";
import YOverlay from "@yy/components/overlay";
import { createNamespace } from "@yy/utils";
import { useLazyRender, useMouseMove } from "@yy/hooks";
import { imagePreviewContextKey } from "@yy/tokens";

import { prevIcon, nextIcon, closeIcon, lessenIcon, amplifyIcon } from "./icons";

const maxScale = 3;

export default defineComponent({
  name: "YImagePreview",
  setup(props, ctx) {
    const show = ref(false);
    const previewSrc = ref("");
    const nextData = reactive({
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      rotate: 0,
    });
    const imgRef = ref<HTMLImageElement>();
    const bem = createNamespace("image-preview");

    const toggle = (bool: boolean) => (show.value = bool);
    const setPreviewSrc = (src: string) => (previewSrc.value = src);
    provide(imagePreviewContextKey, {
      toggle,
      setPreviewSrc,
    });

    const { data, isMove } = useMouseMove(imgRef, {
      move(data, e) {
        e.preventDefault();
      },
      up(data) {
        const { disX, disY } = data;
        const { offsetX, offsetY } = nextData;
        nextData.offsetX = disX + offsetX;
        nextData.offsetY = disY + offsetY;
      },
    });

    const onClose = () => (show.value = false);
    const { lazyRender, destroy } = useLazyRender(show, {
      destroyOnClose: true,
      isTransition: true,
    });

    const zoom = (type: "in" | "out") => {
      return () => {
        const { scale } = nextData;
        if (type === "in" && scale < maxScale) {
          nextData.scale = scale + 0.5;
        }

        if (type === "out" && scale > 0.5) {
          nextData.scale = scale - 0.5;
        }
      };
    };

    const renderToolbar = () => {
      return (
        <div class={bem.e("toolbar")}>
          <i class={bem.m("icon", "toolbar")}>{prevIcon}</i>
          <i class={bem.m("icon", "toolbar")}>{nextIcon}</i>
          <i onClick={zoom("out")} class={bem.m("icon", "toolbar")}>
            {lessenIcon}
          </i>
          <i onClick={zoom("in")} class={bem.m("icon", "toolbar")}>
            {amplifyIcon}
          </i>
          <i onClick={onClose} class={bem.m("icon", "toolbar")}>
            {closeIcon}
          </i>
        </div>
      );
    };

    const renderContent = lazyRender(() => (
      <div class={bem.b()}>
        <YOverlay zIndex={1} onClick={onClose} show={show.value} disabled />
        {renderToolbar()}
        <Transition appear name="y-fade-in-scale" onAfterLeave={destroy}>
          <div v-show={show.value} class={bem.e("wrapper")}>
            <img
              class="img"
              ref={imgRef}
              src={previewSrc.value}
              style={{
                transform: `translateX(${nextData.offsetX + data.disX}px) translateY(${
                  nextData.offsetY + data.disY
                }px) rotate(${nextData.rotate}deg) scale(${nextData.scale})`,
                cursor: isMove.value ? "grabbing" : "grab",
                transitionDuration: isMove.value ? "0s" : "0.3s",
              }}
            />
          </div>
        </Transition>
      </div>
    ));

    ctx.expose({
      toggle,
      setPreviewSrc,
    });

    return () => {
      return (
        <>
          {ctx.slots.default?.()}
          <Teleport to="body">{renderContent()}</Teleport>
        </>
      );
    };
  },
});
