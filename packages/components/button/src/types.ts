import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";

type ButtonTypes = "default" | "primary" | "success" | "warning" | "info" | "danger";

const buttonProps = () => ({
  /**
   * @description 按钮是否为禁用状态
   */
  disabled: Boolean,
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
  type: {
    type: String as PropType<ButtonTypes>,
    default: "default",
  },
  /**
   * @description 按钮是否显示为块级
   */
  block: Boolean,
  /**
   * @description 按钮的显示内容
   */
  content: {
    type: [Function, String] as PropType<string | VNodeChild | (() => VNodeChild)>,
  },
  /**
   * @description
   */
  details: {
    type: Object,
    default: () => ({}),
  },
});

export default buttonProps;
export type ButtonProps = ExtractPropTypes<ReturnType<typeof buttonProps>>;
