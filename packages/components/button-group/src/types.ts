import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";

type ButtonTypes = "default" | "primary" | "success" | "warning" | "info" | "danger" | "dashed";

type ButtonShape = "default" | "circle" | "round";

const buttonGroupProps = () => ({
  /**
   * @description 按钮组的显示内容
   */
  content: {
    type: [Function, String] as PropType<string | VNodeChild | (() => VNodeChild)>,
  },
  /**
   * @description 按钮类型
   */
  type: {
    type: String as PropType<ButtonTypes>,
    default: "default",
  },
  /**
   * @description 按钮的形状
   */
  shape: {
    type: String as PropType<ButtonShape>,
    default: "default",
  },
});

export default buttonGroupProps;
export type ButtonGroupProps = ExtractPropTypes<ReturnType<typeof buttonGroupProps>>;
