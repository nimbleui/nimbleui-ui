import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YSidebar",
  props: {
    /**
     * @description 边栏是否折叠
     */
    collapsed: Boolean,
  },
  setup(props, ctx) {
    const bem = createNamespace("layout-sidebar");

    return () => {
      return (
        <div class={bem.b()}>
          {ctx.slots.default?.()}
          {props.collapsed ? (
            <div class={bem.e("button")}>
              <i></i>
            </div>
          ) : null}
        </div>
      );
    };
  },
});
