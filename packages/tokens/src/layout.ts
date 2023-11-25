import type { InjectionKey } from "vue";

interface LayoutContext {
  setSider: (has: boolean) => void;
}

export const layoutContextKey: InjectionKey<LayoutContext> = Symbol("layoutContextKey");
