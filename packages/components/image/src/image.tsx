import { CSSProperties, computed, defineComponent, inject, ref } from "vue";
import { createNamespace, isString } from "@nimble-ui/utils";
import { imagePreviewContextKey } from "@nimble-ui/tokens";
import { YImagePreview, type imagePreviewExpose } from "@nimble-ui/components/image-preview";

import imageProps from "./types";

export default defineComponent({
  name: "YImage",
  props: imageProps(),
  emits: ["error", "load"],
  setup(props, ctx) {
    const bem = createNamespace("image");

    const imagePreviewRef = ref<imagePreviewExpose>();
    const imagePreviewContext = inject(imagePreviewContextKey, undefined);

    const loaded = ref(false);
    const handleLoad = () => {
      ctx.emit("load");
      loaded.value = true;
    };

    const showError = ref(false);
    const handleError = () => {
      ctx.emit("error");
      showError.value = true;
    };

    const onClick = () => {
      if (props.previewDisabled || showError.value) return;
      const instance = imagePreviewContext?.isGroup ? imagePreviewContext : imagePreviewRef.value;
      instance?.toggle(true);
      instance?.setPreviewSrc(props.previewSrc || props.src || "");
    };

    const renderImage = () => {
      const { src, objectFit, imgProps, previewDisabled } = props;
      return (
        <img
          src={src}
          style={{ objectFit: objectFit, ...imgProps, cursor: previewDisabled ? "" : "pointer" }}
          onClick={onClick}
          onLoad={handleLoad}
          onError={handleError}
          class={bem.e("img")}
        />
      );
    };

    const styles = computed<CSSProperties>(() => {
      const { width, height } = props;
      return {
        width: (isString(width) && isNaN(+width)) || !width ? width : `${width}px`,
        height: (isString(height) && isNaN(+height)) || !height ? height : `${height}px`,
      };
    });

    return () => {
      return (
        <div class={bem.b()} style={styles.value}>
          {imagePreviewContext?.isGroup ? (
            renderImage()
          ) : (
            <YImagePreview ref={imagePreviewRef}>{renderImage()}</YImagePreview>
          )}
        </div>
      );
    };
  },
});
