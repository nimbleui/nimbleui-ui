import { PropType, VNodeChild } from "vue";
import { isFunction } from "./type";
import { keysOf } from "./object";

export type ObjectType = { [key: string]: any };

type Fun<T> = (details: any, uuId?: string | number | symbol) => T;

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
export const mergeCommonProp = <T extends { [key: string]: ObjectType }>(
  props: T
): (() => T & {
  details: {
    type: PropType<ObjectType | Array<any>>;
  };
  uuId: {
    type: PropType<string | number | symbol>;
  };
}) => {
  return () =>
    Object.assign({}, props, {
      details: {
        type: [Object, Array] as PropType<ObjectType | Array<any>>,
      },
      // 组件唯一标识
      uuId: {
        type: [String, Number, Symbol] as PropType<string | number | symbol>,
      },
    });
};

/**
 * 把两个对象，根据属性(keys)合并处理value
 * @param props 对象1
 * @param context 对象2
 * @param keys 对象属性
 * @param callback 回调函数
 * @returns 整合后的新对象
 */
export const handlePropOrContext = <T extends ObjectType, D extends T, K extends keyof T>(
  props: T,
  context: Partial<D> | undefined,
  keys: Array<K>,
  callback?: (value: T[K], contextValue: D[K] | undefined, key: K) => Exclude<T[K], Fun<any>>
) => {
  let index = -1;
  const length = keys.length;
  const result = {} as { [P in K]: Exclude<T[P], Fun<any>> };
  const details = props.details || context?.details || {};

  while (props != null && ++index < length) {
    const key = keys[index];

    if (callback) {
      result[key] = callback(props[key], context?.[key], key);
    } else {
      const value: unknown = props[key] ?? context?.[key];

      const _value = isFunction(value) ? value(details, props.uuId) : value;
      result[key] = _value;
    }
  }
  return result;
};

export const makeChildProp = () => ({
  type: [Object, Function, String, Array, Number] as PropType<VNodeChild | (() => VNodeChild)>,
});

export const makeNumericProp = <T>(defaultVal: T) => ({
  type: [Number, String],
  default: defaultVal,
});

export const mergeFunctionToArray = <T>(fun: (e: T) => void) => {
  return {
    type: [Function, Array] as PropType<typeof fun | Array<typeof fun>>,
  };
};

export const nativeEvents = {
  onWheel: mergeFunctionToArray<WheelEvent>(() => void 0),
  onClick: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMouseenter: mergeFunctionToArray<MouseEvent>(() => void 0),
  onKeydown: mergeFunctionToArray<KeyboardEvent>(() => void 0),
  onKeyup: mergeFunctionToArray<KeyboardEvent>(() => void 0),
  onMousedown: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMouseleave: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMousemove: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMouseout: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMouseover: mergeFunctionToArray<MouseEvent>(() => void 0),
  onMouseup: mergeFunctionToArray<MouseEvent>(() => void 0),
  onResize: mergeFunctionToArray<UIEvent>(() => void 0),
  onScroll: mergeFunctionToArray<Event>(() => void 0),
};

export const nativeEventsKeys = keysOf(nativeEvents);
