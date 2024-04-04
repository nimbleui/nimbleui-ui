import { defineComponent, reactive, ref } from "vue";
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

    function renderItem(i: number, list?: any[]) {
      const { labelField, keyField, details, childrenKey } = props;
      return (
        <YScrollbar trigger="hover" class={bem.e("menus")}>
          {list?.map((item, index) => {
            const key = item[keyField];
            const value = item[labelField];
            const currentIndex = i + 1;

            const itemEl = (
              <div key={key} onClick={onClick(item, index)} class={bem.e("menu")}>
                {ctx.slots.dropdown?.({ item, index }) || <>{isFunction(value) ? value(list, details) : value}</>}
              </div>
            );
            return item[childrenKey] ? (
              <YTooltip teleported key={key} hideArrow trigger="hover" placement="right-start">
                {{
                  default: () => itemEl,
                  content: () => renderItem(currentIndex, item[childrenKey]),
                }}
              </YTooltip>
            ) : (
              itemEl
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
          maxHeight={240}
          maxWidth={800}
        >
          {{
            default: () => {
              return <span class={bem.e("title")}>{ctx.slots.default?.()}</span>;
            },
            content: () => renderItem(0, props.options),
          }}
        </YTooltip>
      );
    };
  },
});
