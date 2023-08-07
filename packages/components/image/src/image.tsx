import { defineComponent, inject, ref } from "vue";
import { createNamespace } from "@yy/utils";
import { imagePreviewContextKey } from "@yy/tokens";
import { YImagePreview, type imagePreviewExpose } from "@yy/components/image-preview";

import imageProps from "./types";

export default defineComponent({
  name: "YImage",
  props: imageProps(),
  setup(props, ctx) {
    const bem = createNamespace("image");

    const imagePreviewRef = ref<imagePreviewExpose>();
    const imagePreviewContext = inject(imagePreviewContextKey);

    const handleLoad = () => {
      console.log(111);
    };

    const handleError = () => {
      console.log("error");
    };

    const onClick = () => {
      const instance = imagePreviewContext?.isGroup ? imagePreviewContext : imagePreviewRef.value;
      instance?.toggle(true);
      instance?.setPreviewSrc(props.src || "");
    };

    const renderImage = () => {
      const { src, width, height } = props;
      return (
        <img onClick={onClick} width={width} height={height} src={src} onLoad={handleLoad} onError={handleError} />
      );
    };

    return () => {
      return (
        <div class={bem.b()}>
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
