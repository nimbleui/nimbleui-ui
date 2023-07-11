import { defineComponent, provide, ref } from "vue";
import YTrigger from "./trigger";
import YContent from "./content";

import tooltipProps from "./types";
import { tooltipTriggerContextKey, tooltipContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
  emits: ["select"],
  setup(props, ctx) {
    const triggerRef = ref<HTMLElement>();
    provide(tooltipTriggerContextKey, {
      setRef(el: HTMLElement) {
        triggerRef.value = el;
      },
    });

    provide(tooltipContextKey, {
      triggerRef,
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
    ctx.expose({
      onClose,
    });

    return () => {
      const { appendTo, trigger, teleported, transition } = props;
      return (
        <>
          <YTrigger trigger={trigger} onToggle={onToggle}>
            {ctx.slots.default?.()}
          </YTrigger>
          <YContent
            show={show.value}
            appendTo={appendTo}
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
