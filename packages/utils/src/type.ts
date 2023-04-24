/* eslint-disable @typescript-eslint/no-explicit-any */
const _toString = Object.prototype.toString;

/**
 * 判断该变量是否是boolean类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isBoolean(el: unknown): el is boolean {
  return typeof el === "boolean";
}

/**
 * 判断该变量是否是string类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isString(el: unknown): el is string {
  return typeof el === "string";
}

/**
 * 判断该变量是否是number类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isNumber(el: unknown): el is number {
  return typeof el === "number";
}

/**
 * 判断该变量是否是array类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isArray(el: unknown): el is Array<any> {
  return Array.isArray(el);
}

/**
 * 判断该变量是否是对象类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isObject(el: unknown): el is Record<string, unknown> {
  return _toString.call(el) === "[object Object]";
}

/**
 * 判断该变量是否是object类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isObjectCopy(el: unknown): el is Record<any, any> {
  return (el !== null && typeof el === "object") || typeof el === "function";
}

/**
 * 判断该变量是否是function类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(el: unknown): el is Function {
  return typeof el === "function";
}

/**
 * 判断该变量是否是promise类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isPromise<T = any>(el: unknown): el is Promise<T> {
  return _toString.call(el) === "[object Promise]";
}

/**
 * 判断该变量是否是正则类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isRegExp(el: unknown): el is RegExp {
  return _toString.call(el) === "[object RegExp]";
}

/**
 * 判断该变量是否是formData类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isFormData(el: unknown): el is FormData {
  return _toString.call(el) === "[object FormData]";
}

/**
 * 判断该变量是否是date类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isDate(el: unknown): el is Date {
  return _toString.call(el) === "[object Data]";
}

/**
 * 判断是否是symbol类型
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isSymbol(el: unknown): el is symbol {
  const type = typeof el;
  return type == "symbol" || (type === "object" && el != null && _toString.call(el) == "[object Symbol]");
}

/**
 * 判断是否是为空
 * @param el 必填，目标
 * @returns 返回true和false
 */
export function isEmpty(el: unknown): el is null {
  return el === null || el === undefined;
}

function isObjectLike(el: unknown): el is object {
  return typeof el === "object" && el !== null;
}
