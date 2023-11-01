import type { ExtractPropTypes, InjectionKey, PropType, Ref } from "vue";
import type { ContainFunction } from "@nimble-ui/utils";

export const radioCommonProps = {
  /**
   * @description 单选按钮 radio 元素的 name 属性。
   */
  name: String,
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: undefined,
  },
  /**
   * @@description 禁用状态
   */
  disabled: {
    type: [Boolean, Function] as PropType<ContainFunction<(details: any, uuId: number) => boolean>>,
    default: undefined,
  },
  /**
   * @description 大小
   */
  size: {
    type: String as PropType<"small" | "medium" | "large">,
  },
  /**
   * @description 标签的位置
   */
  labelPosition: {
    type: String as PropType<"start" | "end">,
  },
} as const;

type radioGroupContext = {
  propsRef: Ref<ExtractPropTypes<typeof radioCommonProps>>;
  onChange: (value: string | number | boolean) => void;
};

export const radioGroupContextKey: InjectionKey<radioGroupContext> = Symbol("radioGroupContextKey");
