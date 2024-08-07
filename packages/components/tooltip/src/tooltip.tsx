import { computed, defineComponent, provide, ref } from "vue";
import YTrigger from "./trigger";
import YContent from "./content";

import tooltipProps from "./types";
import { tooltipContextKey, type RectInfo } from "@nimble-ui/tokens";
import { useEventListener } from "@nimble-ui/hooks";
import { isFunction, pick } from "@nimble-ui/utils";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  emits: ["select", "update:modelValue", "events", "toggle", "outside"],
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
        ctx.emit("toggle", val);
      },
    });
    const onToggle = (e: Event | null, toggle: boolean) => {
      if (e == null) {
        return (show.value = toggle);
      }
      const { details, disabled } = props;
      const res = isFunction(disabled) ? disabled(details) : disabled;

      ctx.emit("events", e.type, toggle);
      if (res) return;

      clearTimeout(time);
      time = window.setTimeout(() => {
        show.value = toggle;
      }, 80);
    };

    const onClose = () => (show.value = false);

    let flag: boolean;
    useEventListener("mousedown", (e) => {
      const target = e.target as HTMLElement;
      const contentCheck = contentRef.value?.contains(target);
      const triggerCheck = triggerRef.value?.contains(target);
      flag = !contentCheck && !triggerCheck;
    });
    useEventListener("mouseup", () => {
      if (flag) onClose();
      ctx.emit("outside", flag);
      flag = false;
    });

    ctx.expose({
      onClose,
    });

    return () => {
      const contentProps = pick(props, [
        "appendTo",
        "trigger",
        "teleported",
        "placement",
        "contentClass",
        "contentStyle",
        "arrowClass",
        "arrowStyle",
        "maxWidth",
        "maxHeight",
        "hideArrow",
      ]);
      return (
        <>
          <YTrigger trigger={props.trigger} onToggle={onToggle}>
            {ctx.slots.default?.()}
          </YTrigger>
          <YContent
            show={show.value}
            transition={props.transition || "y-tooltip"}
            onToggle={onToggle}
            {...contentProps}
          >
            {ctx.slots.content?.()}
          </YContent>
        </>
      );
    };
  },
});
