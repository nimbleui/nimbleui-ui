import { ComputedRef, computed, inject, reactive } from "vue";
import { GlobalConfigContext, globalConfigContextKey } from "@nimble-ui/tokens";

const globalConfig = reactive<GlobalConfigContext>({});

export function useGlobalConfig<K extends keyof GlobalConfigContext, D extends GlobalConfigContext[K]>(
  key: K,
  defaultValue?: D
): ComputedRef<Exclude<GlobalConfigContext[K], undefined> | D>;
export function useGlobalConfig(): GlobalConfigContext;
export function useGlobalConfig<K extends keyof GlobalConfigContext, D extends GlobalConfigContext[K]>(
  key?: K,
  defaultValue?: D
) {
  const config = inject(globalConfigContextKey, globalConfig);

  if (key) {
    return computed(() => config?.zIndex ?? defaultValue);
  } else {
    return config;
  }
}
