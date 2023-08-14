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
