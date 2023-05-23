import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";
import type { ButtonTypes, ButtonShape } from "@yy/tokens";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";

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
});

export default buttonProps;
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
