import { Teleport, Transition, defineComponent, inject, ref } from "vue";

import { tooltipContextKey } from "@yy/tokens";
import { createNamespace, isNumber } from "@yy/utils";

import { contentProps } from "./props";

export default defineComponent({
  name: "YContent",
  props: contentProps(),
  emits: ["toggle", "clickItem"],
  setup(props, ctx) {
    const bem = createNamespace("tooltip-content");
    const tooltipContext = inject(tooltipContextKey, {
      triggerRef: ref<HTMLElement>(),
      contentRef: ref<HTMLElement>(),
      setRef: (el) => el,
    });

    const handleEvent = (e: Event) => {
      e.stopPropagation();
      const { type: eventType } = e;
      const { trigger } = props;
      if (eventType === "mouseenter" && trigger === "hover") {
        ctx.emit("toggle", e, true);
      } else if (eventType === "mouseleave" && trigger === "hover") {
        ctx.emit("toggle", e, false);
      }
    };

    const handleEnter = (element: Element) => {
      const el = element as HTMLElement;
      const triggerEl = tooltipContext?.triggerRef.value as HTMLElement;
      const offsetTop = triggerEl.offsetTop || 0;
      const offsetLeft = triggerEl.offsetLeft || 0;
      const rect = triggerEl?.getBoundingClientRect();
      const { selectWidth, maxHeight } = props;
      console.log(el.offsetHeight);
      console.log(el.offsetWidth);
      el.style.position = "absolute";
      el.style.top = `${offsetTop + rect.height + 5}px`;
      el.style.left = `${offsetLeft}px`;
      el.style.minWidth = `${selectWidth || triggerEl?.offsetWidth}px`;
      el.style.maxHeight = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
    };

    return () => {
      const { appendTo, teleported, transition, show } = props;

      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={transition} onEnter={handleEnter}>
            <div
              class={bem.b()}
              v-show={show}
              ref={tooltipContext?.contentRef}
              onClick={handleEvent}
              onMouseleave={handleEvent}
              onMouseenter={handleEvent}
            >
              <span></span>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
