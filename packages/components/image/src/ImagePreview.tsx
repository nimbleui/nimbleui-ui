import { defineComponent, ref, Teleport } from "vue";
import YOverlay from "@yy/components/overlay";
import { createNamespace } from "@yy/utils";
import { useMouseMove } from "@yy/hooks";

export default defineComponent({
  name: "YImagePreview",
  setup(props, ctx) {
    const imgRef = ref<HTMLImageElement>();
    const bem = createNamespace("image-preview");

    useMouseMove(imgRef, {
      move(data) {
        const { disX, disY } = data;
        console.log(disX);
        console.log(disY);
      },
    });

    return () => {
      return (
        <>
          {ctx.slots.default?.()}
          <Teleport to="body">
            <div class={bem.b()}>
              <YOverlay disabled />
              <div class={bem.e("toolbar")}></div>
              <div class={bem.e("wrapper")}>
                <image ref={imgRef} />
              </div>
            </div>
          </Teleport>
        </>
      );
    };
  },
});
