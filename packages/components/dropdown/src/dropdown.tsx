import { defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YScrollbar } from "@nimble-ui/components/scrollbar";
import { createNamespace, isFunction, pick } from "@nimble-ui/utils";

import dropdownProps, { contentPropsKey } from "./types";

export default defineComponent({
  name: "YDropdown",
  props: dropdownProps(),
  emits: ["select", "update:value"],
  setup(props, ctx) {
    const tooltipRef = ref();
    const bem = createNamespace("dropdown");

    const onClick = (item: any, index: number) => {
      return () => {
        tooltipRef.value?.onClose();
        ctx.emit("select", item, { index, options: props.options });
        ctx.emit("update:value", item[props.keyField]);
      };
    };

    function renderItem() {
      const { options, labelField, keyField, details } = props;
      return (
        <YScrollbar trigger="hover" class={bem.e("menus")}>
          {options?.map((item, index) => {
            const key = item[keyField];
            const value = item[labelField];
            return (
              <div onClick={onClick(item, index)} class={bem.e("menu")} key={key}>
                {ctx.slots.dropdown?.({ item, index }) || <>{isFunction(value) ? value(options, details) : value}</>}
              </div>
            );
          })}
        </YScrollbar>
      );
    }

    return () => {
      return (
        <YTooltip
          ref={tooltipRef}
          {...pick(props, contentPropsKey as any)}
          transition={bem.name("zoom-in-top")}
          contentClass={bem.b()}
          arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
        >
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
