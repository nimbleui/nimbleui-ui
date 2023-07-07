import type { InjectionKey, Ref } from "vue";

type RefSetter = <T>(el: T) => void;
interface TooltipTriggerContext {
  setRef: RefSetter;
}

interface TooltipContext {
  triggerRef: Ref<HTMLElement>;
}

export const tooltipTriggerContextKey: InjectionKey<TooltipTriggerContext> = Symbol("tooltipTriggerContextKey");

export const tooltipContextKey: InjectionKey<TooltipContext> = Symbol("tooltipContextKey");
