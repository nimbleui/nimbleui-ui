import { defineComponent, ref } from "vue";
import { YTooltip } from "@yy/components/tooltip";
import { createNamespace, isFunction } from "@yy/utils";

import dropdownProps from "./types";

export default defineComponent({
  name: "YDropdown",
  props: dropdownProps(),
  emits: ["select"],
  setup(props, ctx) {
    const tooltipRef = ref();
    const bem = createNamespace("dropdown");

    const onClick = (item: any, index: number) => {
      return () => {
        tooltipRef.value?.onClose();
        ctx.emit("select", item, { index, options: props.options });
      };
    };

    function renderItem() {
      const { options, labelField, keyField, details } = props;
      return (
        <ul class={bem.e("menus")}>
          {options?.map((item, index) => {
            const key = item[keyField];
            const value = item[labelField];
            return (
              <li onClick={onClick(item, index)} class={bem.e("menu")} key={key}>
                {ctx.slots.dropdown?.({ item, index }) || <>{isFunction(value) ? value(options, details) : value}</>}
              </li>
            );
          })}
        </ul>
      );
    }

    return () => {
      const { trigger } = props;
      return (
        <YTooltip ref={tooltipRef} trigger={trigger} transition="y-zoom-in-top">
          {{
            default: () => {
              return <span class={bem.e("title")}>{ctx.slots.default?.()}</span>;
            },
            content: renderItem,
          }}
        </YTooltip>
      );
    };
  },
});