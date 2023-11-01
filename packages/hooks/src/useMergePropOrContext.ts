import { computed, isRef, Ref } from "vue";
import { isFunction, type ObjectTypes, type Fun } from "@nimble-ui/utils";

export function useMergePropOrContext<T extends ObjectTypes, K extends { [P in keyof T]?: T[P] | Ref<T[P]> }>(
  props: T,
  context: Ref<K> | K | undefined,
  callback?: <D extends keyof T>(value: T[D], contextValue: K[D], key: D) => T[D]
) {
  const keys = Object.keys(props) as (keyof T)[];
  const length = keys.length;

  return computed(() => {
    let index = -1;
    const result = {} as { [P in keyof T]?: Exclude<T[P], Fun<any>> };
    const ctx = isRef(context) ? context.value : context;
    const details = props.details ?? ctx?.details;

    while (props != null && ++index < length) {
      const key = keys[index];

      const val = props[key];
      const ctxVal = ctx?.[key];
      const ctxValue = isRef(ctxVal) ? ctxVal.value : ctxVal;

      if (callback) {
        result[key] = callback(val, ctxValue, key);
      } else {
        const value: unknown = val ?? ctxValue;

        const _value = isFunction(value) ? value(details, props.uuId) : value;
        result[key] = _value;
      }
    }
    return result;
  });
}
