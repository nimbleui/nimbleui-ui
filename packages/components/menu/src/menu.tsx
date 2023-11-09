import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, provide, reactive, ref } from "vue";
import { menuContextKey } from "@nimble-ui/tokens";

import menuProps from "./types";
import { itemRenderer } from "./utils";

export default defineComponent({
  name: "YMenu",
  props: menuProps(),
  emits: ["update:modelValue", "select", "openChange"],
  setup(props, ctx) {
    const bem = createNamespace("menu");
    const selectSite = reactive<string[]>([]);
    const activeSite = reactive<number[]>([]);
    const selectKey = ref<string | number | symbol>();
    const activeKey = computed(() => props.modelValue || selectKey.value);

    const onSubClick = (site: number[], item: any, isAllOpen?: boolean) => {
      const value = site.join("-");
      const index = selectSite.indexOf(value);
      if (index > -1) {
        selectSite.splice(index, 1);
      } else {
        props.accordion && (selectSite.length = 0);
        selectSite.push(site.join("-"));
      }
      !isAllOpen && ctx.emit("openChange", index === -1, item);
    };

    provide(menuContextKey, {
      selectSite,
      activeSite,
      activeKey,
      onSubClick,
      onItemClick(site, item, key) {
        activeSite.length = 0;
        activeSite.push(...site);
        if (key) ctx.emit("select", item);
        // 更新选择的key
        if (key) {
          selectKey.value = key;
          ctx.emit("update:modelValue", key);
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
