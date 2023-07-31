import { computed, defineComponent } from "vue";
import { YTooltip } from "@yy/components/tooltip";
import { createNamespace, isNumber } from "@yy/utils";
import ellipsisProps from "./types";

export default defineComponent({
  name: "YEllipsis",
  props: ellipsisProps(),
  setup(props, ctx) {
    const bem = createNamespace("ellipsis");

    const ellipsisCls = computed(() => [bem.e("title"), bem.is("line-clamp", !!props.lineClamp)]);

    const renderTitle = () => ctx.slots.default?.();

    return () => {
      const { maxWidth } = props;
      return (
        <div class={bem.b()}>
          <YTooltip trigger="hover" placement="top">
            {{
              default: () => (
                <div class={ellipsisCls.value} style={{ maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth }}>
                  {renderTitle()}
                </div>
              ),
              content: () => <div class={bem.e("content")}>{ctx.slots.tooltip?.() || renderTitle()}</div>,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
