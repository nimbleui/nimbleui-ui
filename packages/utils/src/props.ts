import { PropType } from "vue";
import { isFunction } from "./type";

export type ObjectType = { [key: string]: any };

export type Fun<T> = (details: any) => T;

export const mergeFunctionProp = <T = any>(type: any, defaultVal?: T) => {
  if (defaultVal) {
    return {
      type: [Function, type] as PropType<Fun<T> | T>,
      default: defaultVal,
    };
  } else {
    return {
      type: [Function, type] as PropType<Fun<T> | T>,
    };
  }
};

/**
 * 合并公共参数
 * @param props 组件参数
 * @returns 整合公共参数的对象
 */
export const mergeCommonProp = <T extends ObjectType>(props: T) => ({
  ...props,
  details: {
    type: Object as PropType<ObjectType>,
    default: () => ({}),
  },
});

/**
 * 把两个对象，根据属性(keys)合并处理value
 * @param props 对象1
 * @param context 对象2
 * @param keys 对象属性
 * @param callback 回调函数
 * @returns 新的对象
 */
export const handlePropOrContext = <T extends ObjectType, D extends ObjectType, K extends Extract<keyof T, keyof D>>(
  props: T,
  context: D | undefined,
  keys: Array<K>,
  callback?: (value: any, contextValue: any, key: K) => any
): Record<K, T[K]> => {
  let index = -1;
  const length = keys.length;
  const result = {} as Record<K, T[K]>;
  const details = props.details || context?.details || {};

  while (props != null && ++index < length) {
    const key = keys[index];

    if (callback) {
      result[key] = callback(props[key], context?.[key], key);
    } else {
      const value = props[key] ?? context?.[key]?.value;
      const _value = isFunction(value) ? value(details) : value;
      result[key] = _value;
    }
  }
  return result;
};
