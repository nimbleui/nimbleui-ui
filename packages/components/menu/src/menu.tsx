import { createNamespace } from "@yy/utils";
import { defineComponent, provide, reactive } from "vue";
import { menuContextKey } from "@yy/tokens";

import menuProps from "./types";
import { itemRenderer } from "./utils";

export default defineComponent({
  name: "YMenu",
  props: menuProps(),
  setup(props, ctx) {
    const bem = createNamespace("menu");
    const selectSite = reactive<string[]>([]);
    const activeSite = reactive<number[]>([]);

    const clickSub = (site: number[]) => {
      const value = site.join("-");
      const index = selectSite.indexOf(value);
      if (index > -1) {
        selectSite.splice(index, 1);
      } else {
        props.accordion && (selectSite.length = 0);
        selectSite.push(site.join("-"));
      }
    };

    provide(menuContextKey, {
      selectSite,
      activeSite,
      onClick(type, site) {
        if (type === "item") {
          activeSite.length = 0;
          activeSite.push(...site);
        } else {
          clickSub(site);
        }
      },
    });

    return () => {
      const { keyField, items } = props;
      return (
        <ul class={bem.b()}>
          {items?.map((item, index) => {
            item.key = (item[keyField] ?? `m-${index}`) as string;
            return itemRenderer(item, { ...props, site: [index] });
          })}
        </ul>
      );
    };
  },
});
