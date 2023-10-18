import { defineComponent, provide, reactive, ref, Teleport, Transition } from "vue";
import YOverlay from "@nimble-ui/components/overlay";
import { createNamespace } from "@nimble-ui/utils";
import { useCreateIndex, useLazyRender, useMouseMove } from "@nimble-ui/hooks";
import { imagePreviewContextKey } from "@nimble-ui/tokens";

import imagePreviewProps from "./types";

import {
  prevIcon,
  nextIcon,
  closeIcon,
  lessenIcon,
  amplifyIcon,
  rotateCounterclockwiseIcon,
  RotateClockwiseIcon,
} from "./icons";

const maxScale = 3;

const defaultNextData = {
  offsetX: 0,
  offsetY: 0,
  scale: 1,
  rotate: 0,
};

export default defineComponent({
  name: "YImagePreview",
  props: imagePreviewProps(),
  emits: ["prev", "next"],
  setup(props, ctx) {
    const show = ref(false);
    const previewSrc = ref("");
    const imgRef = ref<HTMLImageElement>();
    const bem = createNamespace("image-preview");

    // 切换显示隐藏
    const toggle = (bool: boolean) => (show.value = bool);
    // 设置当前的图片路径
    const setPreviewSrc = (src: string) => (previewSrc.value = src);
    provide(imagePreviewContextKey, {
      toggle,
      setPreviewSrc,
    });

    const nextData = reactive({ ...defaultNextData });
    // 重置成默认值
    const resetNextData = () => {
      Object.assign(nextData, defaultNextData);
    };
    // 拖拽功能
    const { data, isMove } = useMouseMove(imgRef, {
      boundary: window,
      move(data, e) {
        e.preventDefault();
      },
      up(data) {
        let { disX, disY } = data;
        const { maxMoveDisB, maxMoveDisL, maxMoveDisR, maxMoveDisT } = data;
        const { offsetX, offsetY } = nextData;
        const rect = imgRef.value?.getBoundingClientRect();
        if (!rect) return;

        if (rect.width <= window.innerWidth) {
          disX = 0;
        } else if (disX > 0) {
          disX = maxMoveDisL < 0 ? Math.max(maxMoveDisL, disX) : Math.min(maxMoveDisL, disX);
        } else {
          disX = Math.max(maxMoveDisR, disX);
        }

        if (rect.height <= window.innerHeight) {
          disY = 0;
        } else if (disY > 0) {
          disY = maxMoveDisT < 0 ? Math.max(maxMoveDisT, disY) : Math.min(maxMoveDisT, disY);
        } else {
          disY = Math.max(maxMoveDisB, disY);
        }

        nextData.offsetX = disX + offsetX;
        nextData.offsetY = disY + offsetY;
      },
    });

    const onClose = () => (show.value = false);
    const { lazyRender, destroy } = useLazyRender(show, {
      destroyOnClose: true,
      isTransition: true,
    });

    // 旋转
    const handleRotate = (type: "clockwise" | "counterclockwise") => {
      return () => {
        if (type === "clockwise") {
          nextData.rotate += 90;
        } else {
          nextData.rotate -= 90;
        }
      };
    };

    // 放大缩小
    const handleZoom = (type: "in" | "out") => {
      return () => {
        const { scale, offsetX, offsetY } = nextData;
        if (type === "in" && scale < maxScale) {
          nextData.scale = scale + 0.5;
        }

        if (type === "out" && scale > 0.5) {
          nextData.scale = scale - 0.5;
          nextData.offsetX = offsetX ? Math.max(offsetX - (offsetX / (scale - 1)) * 0.5, 0) : 0;
          nextData.offsetY = offsetY ? Math.max(offsetY - (offsetY / (scale - 1)) * 0.5, 0) : 0;
        }
      };
    };

    const onCut = (type: "prev" | "next") => {
      return () => {
        resetNextData();
        ctx.emit(type);
      };
    };

    const { nextZIndex } = useCreateIndex();
    const zIndex = nextZIndex();

    const renderToolbar = () => {
      const { isGroup } = props;
      return (
        <div class={bem.e("toolbar")} style={{ zIndex: zIndex + 1 }}>
          {isGroup ? (
            <>
              <i onClick={onCut("prev")} class={bem.m("icon", "toolbar")}>
                {prevIcon}
              </i>
              <i onClick={onCut("next")} class={bem.m("icon", "toolbar")}>
                {nextIcon}
              </i>
            </>
          ) : null}
          <i onClick={handleRotate("counterclockwise")} class={bem.m("icon", "toolbar")}>
            {rotateCounterclockwiseIcon}
          </i>
          <i onClick={handleRotate("clockwise")} class={bem.m("icon", "toolbar")}>
            {RotateClockwiseIcon}
          </i>
          <i onClick={handleZoom("out")} class={bem.m("icon", "toolbar")}>
            {lessenIcon}
          </i>
          <i onClick={handleZoom("in")} class={bem.m("icon", "toolbar")}>
            {amplifyIcon}
          </i>
          <i onClick={onClose} class={bem.m("icon", "toolbar")}>
            {closeIcon}
          </i>
        </div>
      );
    };

    const onDestroy = () => {
      destroy();
      resetNextData();
    };

    const renderContent = lazyRender(() => (
      <div class={bem.b()} style={{ zIndex }}>
        <YOverlay zIndex={zIndex} onClick={onClose} show={show.value} disabled />
        {renderToolbar()}
        <Transition appear name={bem.name("fade-in-scale")} onAfterLeave={onDestroy}>
          <div v-show={show.value} class={bem.e("wrapper")} style={{ zIndex }}>
            <img
              class="img"
              ref={imgRef}
              src={previewSrc.value}
              style={{
                transform: `translateX(${nextData.offsetX + data.disX}px) translateY(${
                  nextData.offsetY + data.disY
                }px) rotate(${nextData.rotate}deg) scale(${nextData.scale})`,
                cursor: isMove.value ? "move" : "grab",
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
