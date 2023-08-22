import { createNamespace, isFunction } from "@yy/utils";
import { computed, defineComponent, inject, watch } from "vue";

import { menuItemProps } from "./props";
import { menuContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YMenuItem",
  props: menuItemProps(),
  setup(props) {
    const bem = createNamespace("menu-item");

    const menuContext = inject(menuContextKey, undefined);

    const active = computed(() => {
      const { site, keyField, item } = props;
      return menuContext?.activeSite?.join("") === site.join("") && item?.[keyField] === menuContext.activeKey.value;
    });

    const onClick = () => {
      const { item, site, keyField } = props;
      menuContext?.onClick("item", site, item?.[keyField] as number | string | symbol);
    };

    if (menuContext?.activeKey) {
      watch(
        menuContext.activeKey,
        (val) => {
          const { item, site, keyField } = props;
          if (item?.[keyField] == val) {
            menuContext?.onClick("item", site);
          }
        },
        { immediate: true }
      );
    }

    return () => {
      const { item, details, nodeIndent = 0, keyField, site, labelField, indent, slots } = props;
      const key = (item?.[keyField] || `m-${site.join("-")}`) as string;
      const label = item?.[labelField];
      return (
        <li
          key={key}
          onClick={onClick}
          style={{ paddingLeft: `${nodeIndent + indent}px` }}
          class={[bem.b(), bem.is("active", active.value)]}
        >
          <div class={bem.e("content")}>
            {slots.item ? slots.item({ item, active: active.value }) : isFunction(label) ? label(details) : label}
          </div>
        </li>
      );
    };
  },
});
