import { getCurrentInstance } from "vue";

export function useExpose<T = Record<string, any>>(obj: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, obj);
  }
}
