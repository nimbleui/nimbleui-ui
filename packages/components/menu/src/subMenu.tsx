import { createNamespace, isFunction } from "@yy/utils";
import { Transition, computed, defineComponent, inject } from "vue";
import { menuContextKey } from "@yy/tokens";

import { type MenuItems, MENU_NODE_INDENT, subMenuProps } from "./props";
import { itemRenderer } from "./utils";

export default defineComponent({
  name: "YSubMenu",
  props: subMenuProps(),
  setup(props) {
    const bem = createNamespace("sub-menu");
    const menuContext = inject(menuContextKey, undefined);

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
        <div onClick={onClick} style={{ paddingLeft: `${nodeIndent + MENU_NODE_INDENT}px` }} class={bem.e("title")}>
          {item?.icon?.(details)}
          {labelNode}
          <i class={[bem.m("arrow", "title"), "is-opposite"]}></i>
        </div>
      );
    };

    const createSubmenuChildren = () => {
      const { item, childrenField, keyField, nodeIndent = 0, site = [] } = props;

      const list = item?.[childrenField] as MenuItems[];
      return (
        <Transition appear>
          <ul v-show={show.value} class={[bem.e("children")]}>
            {list.map((el, index) => {
              el.key = (el?.[keyField] ?? `${item?.key}-${index}`) as string;
              return itemRenderer(el, { ...props, nodeIndent: nodeIndent + MENU_NODE_INDENT, site: [...site, index] });
            })}
          </ul>
        </Transition>
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
