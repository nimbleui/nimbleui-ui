import { createNamespace, isFunction } from "@yy/utils";
import { computed, defineComponent, inject } from "vue";

import { MENU_NODE_INDENT, menuItemProps } from "./props";
import { menuContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YMenuItem",
  props: menuItemProps(),
  setup(props) {
    const bem = createNamespace("menu-item");

    const menuContext = inject(menuContextKey, undefined);

    const show = computed(() => {
      const len = props.site.length;
      const value = menuContext?.activeSite.slice(0, len);
      return value?.join("") === props.site.join("");
    });

    const onClick = () => {
      menuContext?.onClick("item", props.site);
    };

    return () => {
      const { item, details, nodeIndent = 0 } = props;
      return (
        <li
          onClick={onClick}
          style={{ paddingLeft: `${nodeIndent + MENU_NODE_INDENT}px` }}
          key={item?.key}
          class={[bem.b(), bem.is("active", show.value)]}
        >
          {isFunction(item?.label) ? item?.label(details) : item?.label}
        </li>
      );
    };
  },
});
