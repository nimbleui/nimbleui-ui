/**
 * 把目标转成数组
 * @param item 目标
 * @returns {Array}
 */
export const toArray = <T>(item: T | T[]): T[] => (Array.isArray(item) ? item : [item]);
