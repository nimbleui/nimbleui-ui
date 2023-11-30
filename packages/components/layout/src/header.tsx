import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";

export default defineComponent({
  name: "YHeader",
  props: {
    /**
     * @description 是否显示边框
     */
    bordered: Boolean,
    /**
     * @description 是否固定头部
     */
    fixed: Boolean,
  },
  setup(props, ctx) {
    const bem = createNamespace("layout-header");

    return () => {
      return <header class={bem.b()}>{ctx.slots.default?.()}</header>;
    };
  },
});
