import { computed, defineComponent, provide, ref } from "vue";
import YTrigger from "./trigger";
import YContent from "./content";

import tooltipProps from "./types";
import { tooltipContextKey, type RectInfo } from "@nimble-ui/tokens";
import { useEventListener } from "@nimble-ui/hooks";
import { isFunction } from "@nimble-ui/utils";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  emits: ["select", "update:modelValue", "events"],
  setup(props, ctx) {
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    provide(tooltipContextKey, {
      triggerRef,
      contentRef,
      rectInfo: {} as RectInfo,
      setRef(el: HTMLElement) {
        triggerRef.value = el;
      },
    });

    let time = 0;
    const selfModel = ref(false);
    const show = computed({
      get: () => props.modelValue ?? selfModel.value,
      set(val) {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });
    const onToggle = (e: Event, toggle: boolean) => {
      const { details, disabled } = props;
      const res = isFunction(disabled) ? disabled(details) : disabled;

      ctx.emit("events", e.type);
      if (res) return;

      clearTimeout(time);
      time = window.setTimeout(() => {
        show.value = toggle;
      }, 80);
    };

    const onClose = () => (show.value = false);

    useEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const contentCheck = contentRef.value?.contains(target);
      const triggerCheck = triggerRef.value?.contains(target);

      if (!contentCheck && !triggerCheck) onClose();
    });

    ctx.expose({
      onClose,
    });

    return () => {
      const {
        appendTo,
        trigger,
        teleported,
        transition,
        placement,
        contentClass,
        contentStyle,
        arrowClass,
        arrowStyle,
      } = props;
      return (
        <>
          <YTrigger trigger={trigger} onToggle={onToggle}>
            {ctx.slots.default?.()}
          </YTrigger>
          <YContent
            show={show.value}
            trigger={trigger}
            appendTo={appendTo}
            placement={placement}
            transition={transition || "y-tooltip"}
            teleported={teleported}
            onToggle={onToggle}
            arrowClass={arrowClass}
            arrowStyle={arrowStyle}
            contentClass={contentClass}
            contentStyle={contentStyle}
          >
            {ctx.slots.content?.()}
          </YContent>
        </>
      );
    };
  },
});
