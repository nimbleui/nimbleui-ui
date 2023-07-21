import { InjectionKey } from "vue";

export interface GlobalConfigContext {
  // 初始zIndex
  zIndex?: number;
}

export const globalConfigContextKey: InjectionKey<GlobalConfigContext> = Symbol("CONFIG_CONTEXT_KEY");
