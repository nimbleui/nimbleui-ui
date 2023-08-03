import { computed, defineComponent, ref } from "vue";
import { YTooltip } from "@yy/components/tooltip";
import { createNamespace, isNumber } from "@yy/utils";
import ellipsisProps from "./types";

export default defineComponent({
  name: "YEllipsis",
  props: ellipsisProps(),
  setup(props, ctx) {
    const triggerRef = ref<HTMLElement>();
    const triggerInnerRef = ref<HTMLElement>();
    const bem = createNamespace("ellipsis");

    const tooltipDisabled = () => {
      let tooltipDisabled = false;
      const { value: trigger } = triggerRef;
      if (trigger) {
        if (props.lineClamp > 1) {
          tooltipDisabled = trigger.scrollHeight <= trigger.offsetHeight;
        } else {
          const { value: triggerInner } = triggerInnerRef;
          if (triggerInner) {
            tooltipDisabled = triggerInner.getBoundingClientRect().width <= trigger.getBoundingClientRect().width;
          }
        }
      }
      return tooltipDisabled;
    };

    const ellipsisCls = computed(() => [bem.e("title"), bem.is("line-clamp", props.lineClamp > 1)]);

    return () => {
      const { maxWidth, lineClamp } = props;
      return (
        <div class={bem.b()}>
          <YTooltip disabled={tooltipDisabled} trigger="hover" placement="top" transition="y-tooltip">
            {{
              default: () => (
                <div
                  ref={triggerRef}
                  class={ellipsisCls.value}
                  style={{
                    maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
                    "-webkit-line-clamp": lineClamp > 1 ? lineClamp : undefined,
                  }}
                >
                  {props.lineClamp ? ctx.slots.default?.() : <span ref={triggerInnerRef}>{ctx.slots.default?.()}</span>}
                </div>
              ),
              content: () => <div class={bem.e("content")}>{ctx.slots.tooltip?.() || ctx.slots.default?.()}</div>,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
