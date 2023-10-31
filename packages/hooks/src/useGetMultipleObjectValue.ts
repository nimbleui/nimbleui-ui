import { computed } from "vue";

/**
 * 取值
 * @param props 组件
 * @param context 父级传参
 */
export function useGetMultipleObjectValue<T extends { [key: string]: any }, K extends { [key: string]: any }>(
  props: T,
  context: K
) {
  return computed(() =>
    Object.keys(props).reduce((acc, key: keyof T) => {
      // acc[key] = acc[key] ?? context[key];
      return acc;
    }, {} as T)
  );
}

useGetMultipleObjectValue({ a: 1, b: 2 }, { a: 222 });
