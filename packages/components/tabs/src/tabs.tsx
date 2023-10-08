import { createNamespace, isFunction } from "@nimble-ui/utils";
import { defineComponent } from "vue";

import tabsProps from "./types";

export default defineComponent({
  name: "YTabs",
  props: tabsProps(),
  emits: ["change"],
  setup(props, ctx) {
    const bem = createNamespace("tabs");

    const handleClick = () => {
      console.log(111);
      ctx.emit("change");
    };

    return () => {
      const { items, labelField, keyField } = props;
      return items?.length ? (
        <div class={bem.b()}>
          <div class={bem.e("nav")}>
            <div class={bem.m("list", "nav")}>
              {items.map((item, index) => {
                const key = item[keyField] as string;
                const label = item[labelField];

                return (
                  <div onClick={handleClick} key={key ?? index} class={bem.m("list-item", "nav")}>
                    {isFunction(label) ? label(item) : label}
                  </div>
                );
              })}
            </div>
          </div>
          <div class={bem.e("content")}></div>
        </div>
      ) : null;
    };
  },
});
