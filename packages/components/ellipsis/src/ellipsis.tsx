import { computed, defineComponent } from "vue";
import { YTooltip } from "@yy/components/tooltip";
import { createNamespace, isNumber } from "@yy/utils";
import ellipsisProps from "./types";

export default defineComponent({
  name: "YEllipsis",
  props: ellipsisProps(),
  setup(props, ctx) {
    const bem = createNamespace("ellipsis");

    const ellipsisCls = computed(() => [bem.e("title"), bem.is("line-clamp", props.lineClamp > 1)]);

    const renderTitle = () => ctx.slots.default?.();

    return () => {
      const { maxWidth, lineClamp } = props;
      return (
        <div class={bem.b()}>
          <YTooltip trigger="hover" placement="top" transition="y-ellipsis">
            {{
              default: () => (
                <div
                  class={ellipsisCls.value}
                  style={{
                    maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
                    "-webkit-line-clamp": lineClamp > 1 ? lineClamp : undefined,
                  }}
                >
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
