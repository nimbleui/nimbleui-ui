import { defineComponent, Teleport } from "vue";
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
        <>
          {ctx.slots.default?.()}
          <Teleport to="body">
            <div class={bem.b()}>
              <YOverlay disabled />
              <div class={bem.e("toolbar")}></div>
              <div class={bem.e("wrapper")}>
                <image onLoad={handleLoad} onError={handleError} />
              </div>
            </div>
          </Teleport>
        </>
      );
    };
  },
});
