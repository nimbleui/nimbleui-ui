import { defineComponent, provide, ref } from "vue";
import YTrigger from "./trigger";
import YContent from "./content";

import tooltipProps from "./types";
import { tooltipContextKey, type RectInfo } from "@yy/tokens";
import { useEventListener } from "@yy/hooks";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  emits: ["select"],
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
    const show = ref(false);
    const onToggle = (e: Event, toggle: boolean) => {
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
      const { appendTo, trigger, teleported, transition, placement } = props;
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
            transition={transition}
            teleported={teleported}
            onToggle={onToggle}
          >
            {ctx.slots.content?.()}
          </YContent>
        </>
      );
    };
  },
});
