import { defineComponent, provide, reactive, ref, Teleport, Transition } from "vue";
import YOverlay from "@yy/components/overlay";
import { createNamespace } from "@yy/utils";
import { useLazyRender, useMouseMove } from "@yy/hooks";
import { imagePreviewContextKey } from "@yy/tokens";

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

    const onClickOverlay = () => (show.value = false);
    const { lazyRender, destroy } = useLazyRender(show, {
      destroyOnClose: true,
      isTransition: true,
    });

    const renderContent = lazyRender(() => (
      <div class={bem.b()}>
        <YOverlay zIndex={1} onClick={onClickOverlay} show={show.value} disabled />
        <div class={bem.e("toolbar")}>333</div>
        <Transition appear name="y-fade-in-scale" onAfterLeave={destroy}>
          <div v-show={show.value} class={bem.e("wrapper")}>
            <img
              style={{
                transform: `translateX(${nextData.offsetX + data.disX}px) translateY(${
                  nextData.offsetY + data.disY
                }px) rotate(${nextData.rotate}deg) scale(${nextData.scale})`,
                cursor: isMove.value ? "grabbing" : "grab",
              }}
              src={previewSrc.value}
              class="img"
              ref={imgRef}
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
