import { createNamespace } from "@yy/utils";
import { defineComponent, Transition } from "vue";

import expandTransitionProps from "./types";

export default defineComponent({
  name: "YExpandTransition",
  props: expandTransitionProps(),
  setup(props, ctx) {
    const bem = createNamespace("expand-transition");

    const handleBeforeEnter = (element: Element) => {
      const el = element as HTMLElement;
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.maxHeight = "0px";
      el.style.paddingTop = "0px";
      el.style.paddingBottom = "0px";
    };

    const handleEnter = (element: Element) => {
      const el = element as HTMLElement;
      el.dataset.oldOverflow = el.style.overflow;

      if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.paddingTop = el.dataset.oldPaddingTop || "";
        el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
      } else {
        el.style.maxHeight = "0px";
        el.style.paddingTop = el.dataset.oldPaddingTop || "";
        el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
      }

      el.style.overflow = "hidden";
    };

    const handleAfterEnter = (element: Element) => {
      const el = element as HTMLElement;
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow || "";
    };

    const handleBeforeLeave = (element: Element) => {
      const el = element as HTMLElement;
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.overflow = "hidden";
    };

    const handleLeave = (element: Element) => {
      const el = element as HTMLElement;
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = "0px";
        el.style.paddingTop = "0px";
        el.style.paddingBottom = "0px";
      }
    };

    const onAfterLeave = (element: Element) => {
      const el = element as HTMLElement;
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow || "";
      el.style.paddingTop = el.dataset.oldPaddingTop || "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
    };

    return () => {
      const { appear, mode } = props;
      return (
        <Transition
          mode={mode}
          name={bem.b()}
          appear={appear}
          onBeforeEnter={handleBeforeEnter}
          onEnter={handleEnter}
          onAfterEnter={handleAfterEnter}
          onBeforeLeave={handleBeforeLeave}
          onLeave={handleLeave}
          onAfterLeave={onAfterLeave}
        >
          {ctx.slots.default?.()}
        </Transition>
      );
    };
  },
});
