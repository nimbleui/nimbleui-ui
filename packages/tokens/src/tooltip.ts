import type { InjectionKey, Ref } from "vue";

type RefSetter = <T>(el: T) => void;

interface TooltipContext {
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  setRef: RefSetter;
}

export const tooltipContextKey: InjectionKey<TooltipContext> = Symbol("tooltipContextKey");
