import { isEmpty } from "./type";

/**
 * 选择 obj 的属性组成新的对象
 * @param obj 对象
 * @param paths 对象中的属性
 * @returns {Object}
 */
export function pick<T extends { [key: string]: any }, U extends keyof T>(
  obj: T,
  paths: Array<U>,
  callback?: (value: any) => any
): Pick<T, U> {
  let index = -1;
  const length = paths.length;
  const result = {} as Pick<T, U>;

  while (obj != null && ++index < length) {
    const path = paths[index];
    const value = obj[path];
    if (!isEmpty(value)) {
      result[path] = callback ? callback(value) : value;
    }
  }
  return result;
}

/**
 * 获取obj 所有属性
 * @param obj 目标对象
 * @returns
 */
export function keysOf<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
  return Object.keys(obj);
}

export function formaKeyOfValue<T extends { [key: string]: any }, K extends keyof T>(
  obj: T,
  keys: Array<K>
): { [K in (typeof keys)[number]]: T[K] };
export function formaKeyOfValue<
  T extends { [key: string]: any },
  K extends keyof T,
  C extends (val: T[K], key: K) => any
>(obj: T, keys: Array<K>, callback: C): { [R in K]: ReturnType<C> };
/**
 * 取对象部分值，返回新的对象
 * @param obj 目标对象
 * @param keys key数组
 * @param callback 转换值的函数
 * @returns
 */
export function formaKeyOfValue<
  T extends { [key: string]: any },
  K extends keyof T,
  C extends (val: T[K], key: K) => any
>(obj: T, keys: Array<K>, callback?: C) {
  const result = {} as { [K in (typeof keys)[number]]: ReturnType<C> | T[K] };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result[key] = callback?.(obj[key], key) ?? obj[key];
  }
  return result;
}
