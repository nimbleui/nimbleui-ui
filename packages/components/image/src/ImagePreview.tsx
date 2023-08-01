import { defineComponent } from "vue";
import YOverlay from "@yy/components/overlay";
import { createNamespace } from "@yy/utils";

export default defineComponent({
  name: "YImagePreview",
  setup(props, ctx) {
    const bem = createNamespace("image-preview");

    const handleLoad = () => {
      console.log(111);
    };

    const handleError = () => {
      console.log("error");
    };

    return () => {
      return (
        <div class={bem.b()}>
          <YOverlay />
          <div class={bem.e("toolbar")}></div>
          <div class={bem.e("wrapper")}>
            <image onLoad={handleLoad} onError={handleError} />
          </div>
        </div>
      );
    };
  },
});
