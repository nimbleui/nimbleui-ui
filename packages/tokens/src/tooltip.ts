import type { InjectionKey, Ref } from "vue";

type RefSetter = <T>(el: T) => void;

export type RectInfo = {
  width: number;
  height: number;
};
interface TooltipContext {
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  setRef: RefSetter;
  rectInfo: RectInfo;
}

export const tooltipContextKey: InjectionKey<TooltipContext> = Symbol("tooltipContextKey");
