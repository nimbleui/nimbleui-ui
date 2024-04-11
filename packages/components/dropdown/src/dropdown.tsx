import { defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { createNamespace, pick } from "@nimble-ui/utils";

import dropdownProps, { contentPropsKey } from "./types";
import YDropdownMenu from "./dropdownMenu";

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

    return () => {
      const menuProps = pick(props, ["keyField", "labelField", "childrenKey", "options"]);

      return (
        <YTooltip
          ref={tooltipRef}
          {...pick(props, contentPropsKey as any)}
          transition={bem.name("zoom-in-top")}
          contentClass={bem.b()}
          arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
          maxHeight={1000}
          maxWidth={1000}
        >
          {{
            default: () => {
              return <span class={bem.e("title")}>{ctx.slots.default?.()}</span>;
            },
            content: () => <YDropdownMenu {...menuProps} />,
          }}
        </YTooltip>
      );
    };
  },
});
