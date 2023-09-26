import { createNamespace } from "@nimble-ui/utils";
import YScrollbar from "@nimble-ui/components/scrollbar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YContent",
  inheritAttrs: false,
  setup(props, ctx) {
    const bem = createNamespace("layout-content");
    return () => {
      return (
        <YScrollbar contentStyle={ctx.attrs.style as any} contentClass={[bem.b(), ctx.attrs.class]}>
          {ctx.slots.default?.()}
        </YScrollbar>
      );
    };
  },
});
