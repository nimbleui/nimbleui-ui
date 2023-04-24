import { InjectionKey, getCurrentInstance, inject, onUnmounted } from "vue";
import type { Context as FormContext } from "@yy/tokens";
type ParentProvide<T> = T & FormContext;

export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  const parent = inject(key, null);
  if (parent) {
    const instance = getCurrentInstance();
    const { link, unLink, ...other } = parent;

    link(instance);
    onUnmounted(() => unLink(instance));

    return {
      parent,
      ...other,
    };
  }

  return null;
}
