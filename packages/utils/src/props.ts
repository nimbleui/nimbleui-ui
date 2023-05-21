import { PropType } from "vue";

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

export const mergeCommonProp = <T extends ObjectType>(props: T) => ({
  ...props,
  details: {
    type: Object as PropType<ObjectType>,
    default: () => ({}),
  },
});
