import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, inject } from "vue";
import { layoutContextKey } from "@nimble-ui/tokens";
import { YScrollbar } from "@nimble-ui/components/scrollbar";

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

    const layoutContext = inject(layoutContextKey, undefined);
    layoutContext?.setSider(true);

    return () => {
      return (
        <aside class={bem.b()}>
          <YScrollbar trigger="hover">{ctx.slots.default?.()}</YScrollbar>
          {props.collapsed ? (
            <div class={bem.e("button")}>
              <i></i>
            </div>
          ) : null}
        </aside>
      );
    };
  },
});
