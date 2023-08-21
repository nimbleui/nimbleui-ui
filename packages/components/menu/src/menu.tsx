import { createNamespace } from "@yy/utils";
import { computed, defineComponent, provide, reactive, ref } from "vue";
import { menuContextKey } from "@yy/tokens";

import menuProps from "./types";
import { itemRenderer } from "./utils";

export default defineComponent({
  name: "YMenu",
  props: menuProps(),
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("menu");
    const selectSite = reactive<string[]>([]);
    const activeSite = reactive<number[]>([]);
    const activeKey = computed(() => props.modelValue);

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
      activeKey,
      onClick(type, site, key) {
        if (type === "item") {
          activeSite.length = 0;
          activeSite.push(...site);
          // 更新选择的key
          if (key) ctx.emit("update:modelValue", key);
        } else {
          clickSub(site);
        }
      },
    });

    return () => {
      const { items } = props;
      return (
        <ul class={bem.b()}>
          {items?.map((item, index) => {
            return itemRenderer(item, { ...props, site: [index], slots: ctx.slots });
          })}
        </ul>
      );
    };
  },
});
