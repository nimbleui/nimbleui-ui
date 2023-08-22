import { createNamespace, isFunction } from "@yy/utils";
import { computed, defineComponent, inject, ref, watch } from "vue";
import { menuContextKey } from "@yy/tokens";
import { YExpandTransition } from "@yy/components/expand-transition";

import { type MenuItems, subMenuProps } from "./props";
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
    const show = ref(props.allOpen ?? false);

    if (menuContext) {
      const str = props.site.join("-");
      watch(menuContext.selectSite, (val) => {
        show.value = val.includes(str);
      });
      watch(menuContext.activeSite, (val) => {
        const len = props.site.length;
        const value = val.slice(0, len).join("-") == str;

        value && (show.value = value);
      });
    }

    const onClick = () => {
      menuContext?.onSubClick(props.site, props.item);
    };
    // 如果是默认全部打开，要保存位置
    if (props.allOpen) menuContext?.onSubClick(props.site, props.item, true);

    const createSubmenuItem = () => {
      const { item, labelField, details, nodeIndent = 0, indent, slots } = props;
      const label = item?.[labelField];
      const labelNode = isFunction(label) ? label(details) : label;

      return (
        <div
          onClick={onClick}
          style={{ paddingLeft: `${nodeIndent + indent}px` }}
          class={[bem.e("title"), bem.is("active", active.value)]}
        >
          <div class={bem.m("content", "title")}>
            {slots.sub ? (
              slots.sub({ item, open: show.value, active: active.value })
            ) : (
              <>
                {item?.icon?.(details)}
                {labelNode}
              </>
            )}
            <i class={[bem.m("arrow", "title"), bem.is("opposite", show.value), bem.is("positive", !show.value)]}></i>
          </div>
        </div>
      );
    };

    const createSubmenuChildren = () => {
      const { item, childrenField, nodeIndent = 0, site = [], indent, slots } = props;

      const list = item?.[childrenField] as MenuItems[];
      return (
        <YExpandTransition>
          <ul v-show={show.value} class={[bem.e("children")]}>
            {list.map((el, index) => {
              return itemRenderer(el, {
                ...props,
                slots,
                nodeIndent: nodeIndent + indent,
                site: [...site, index],
              });
            })}
          </ul>
        </YExpandTransition>
      );
    };

    return () => {
      const { item, keyField, site } = props;
      const key = (item?.[keyField] || `m-${site.join("-")}`) as string;
      return (
        <li class={bem.b()} key={key}>
          {createSubmenuItem()}
          {createSubmenuChildren()}
        </li>
      );
    };
  },
});
