import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";
import type { ButtonTypes, ButtonShape, ButtonSize } from "@nimble-ui/tokens";
import { mergeCommonProp, mergeFunctionProp } from "@nimble-ui/utils";

const buttonProps = mergeCommonProp({
  /**
   * @description 按钮是否为禁用状态
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
  /**
   * @description button原生type属性
   */
  nativeType: {
    type: String as PropType<"submit" | "reset" | "button">,
    default: "button",
  },
  /**
   * @description 按钮的类型
   */
  type: mergeFunctionProp<ButtonTypes>(String),
  /**
   * @description 按钮是否显示为块级
   */
  block: Boolean,
  /**
   * @description 按钮的显示内容
   */
  content: {
    type: [Function, String] as PropType<string | VNodeChild | ((details: any) => VNodeChild)>,
  },
  /**
   * @description 按钮的形状
   */
  shape: mergeFunctionProp<ButtonShape>(String),
  /**
   * @description 按钮的尺寸
   */
  size: mergeFunctionProp<ButtonSize>(String),
  /**
   * @description 是否为朴素按钮
   */
  plain: Boolean,
  /**
   * @description 是否为圆角按钮
   */
  round: Boolean,
  /**
   * @description 是否为圆形按钮
   */
  circle: Boolean,
  /**
   * @description 是否为加载中状态
   */
  loading: Boolean,
});

export { ButtonShape, ButtonSize, ButtonTypes };

export default buttonProps;
export type ButtonProps = ExtractPropTypes<ReturnType<typeof buttonProps>>;
