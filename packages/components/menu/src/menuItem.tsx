import { createNamespace, isFunction } from "@yy/utils";
import { computed, defineComponent, inject } from "vue";

import { menuItemProps } from "./props";
import { menuContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YMenuItem",
  props: menuItemProps(),
  setup(props) {
    const bem = createNamespace("menu-item");

    const menuContext = inject(menuContextKey, undefined);

    const active = computed(() => {
      return menuContext?.activeSite?.join("") === props.site.join("");
    });

    const onClick = () => {
      menuContext?.onClick("item", props.site);
    };

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
