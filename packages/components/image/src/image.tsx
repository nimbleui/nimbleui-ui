import { defineComponent } from "vue";
import { createNamespace } from "@yy/utils";
import ImagePreview from "./ImagePreview";

import imageProps from "./types";

export default defineComponent({
  name: "YImage",
  props: imageProps(),
  setup(props, ctx) {
    const bem = createNamespace("image");

    const handleLoad = () => {
      console.log(111);
    };

    const handleError = () => {
      console.log("error");
    };

    return () => {
      const { src } = props;
      return (
        <ImagePreview>
          <div class={bem.b()}>
            <img src={src} onLoad={handleLoad} onError={handleError} />
          </div>
        </ImagePreview>
      );
    };
  },
});
