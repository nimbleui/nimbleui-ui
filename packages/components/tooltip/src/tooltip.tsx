import { defineComponent, provide, ref } from "vue";
import YTrigger from "./trigger";
import YContent from "./content";

import tooltipProps from "./types";
import { tooltipTriggerContextKey, tooltipContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YTooltip",
  props: tooltipProps(),
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

    const show = ref(false);
    const onToggle = (e: Event, toggle: boolean) => {
      console.log("执行");
      console.log(toggle);
      show.value = toggle;
    };

    return () => {
      const { appendTo, trigger, teleported, transition, menu } = props;
      return (
        <>
          <YTrigger trigger={trigger} onToggle={onToggle}>
            {ctx.slots.default?.()}
          </YTrigger>
          <YContent transition={transition} show={show.value} appendTo={appendTo} teleported={teleported} menu={menu}>
            {{
              content: (item: any, index: number) => ctx.slots.content?.(item, index),
            }}
          </YContent>
        </>
      );
    };
  },
});
