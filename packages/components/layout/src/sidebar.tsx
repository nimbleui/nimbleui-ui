import { createNamespace } from "@nimble-ui/utils";
import YScrollbar from "@nimble-ui/components/scrollbar";
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
          <YScrollbar trigger="hover">{ctx.slots.default?.()}</YScrollbar>
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
