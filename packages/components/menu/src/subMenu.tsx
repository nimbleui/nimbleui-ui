import { createNamespace, isFunction } from "@yy/utils";
import { Transition, computed, defineComponent, inject } from "vue";
import { menuContextKey } from "@yy/tokens";
import { YExpandTransition } from "@yy/components/expand-transition";

import { type MenuItems, MENU_NODE_INDENT, subMenuProps } from "./props";
import { itemRenderer } from "./utils";

export default defineComponent({
  name: "YSubMenu",
  props: subMenuProps(),
  setup(props) {
    const bem = createNamespace("sub-menu");
    const menuContext = inject(menuContextKey, undefined);

    const active = computed(() => {
      const len = props.site.length;
      const value = menuContext?.activeSite.slice(0, len);
      return value?.join("") === props.site.join("");
    });
    const show = computed(() => {
      return menuContext?.selectSite.includes(props.site.join("-"));
    });

    const onClick = () => {
      menuContext?.onClick("sub", props.site);
    };

    const createSubmenuItem = () => {
      const { item, labelField, details, nodeIndent = 0 } = props;
      const label = item?.[labelField];
      const labelNode = isFunction(label) ? label(details) : label;

      return (
        <div
          onClick={onClick}
          style={{ paddingLeft: `${nodeIndent + MENU_NODE_INDENT}px` }}
          class={[bem.e("title"), bem.is("active", active.value)]}
        >
          <div class={bem.m("content", "title")}>
            {item?.icon?.(details)}
            {labelNode}
            <i class={[bem.m("arrow", "title"), bem.is("opposite", show.value), bem.is("positive", !show.value)]}></i>
          </div>
        </div>
      );
    };

    const createSubmenuChildren = () => {
      const { item, childrenField, keyField, nodeIndent = 0, site = [] } = props;

      const list = item?.[childrenField] as MenuItems[];
      return (
        <YExpandTransition>
          <ul v-show={show.value} class={[bem.e("children")]}>
            {list.map((el, index) => {
              el.key = (el?.[keyField] ?? `${item?.key}-${index}`) as string;
              return itemRenderer(el, {
                ...props,
                nodeIndent: nodeIndent + MENU_NODE_INDENT,
                site: [...site, index],
              });
            })}
          </ul>
        </YExpandTransition>
      );
    };

    return () => {
      const { item } = props;
      return (
        <li class={bem.b()} key={item?.key}>
          {createSubmenuItem()}
          {createSubmenuChildren()}
        </li>
      );
    };
  },
});
