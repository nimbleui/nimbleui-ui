import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";

const buttonGroupProps = () => ({
  /**
   * @description 按钮组的显示内容
   */
  content: {
    type: [Function, String] as PropType<string | VNodeChild | (() => VNodeChild)>,
  },
});

export default buttonGroupProps;
export type ButtonProps = ExtractPropTypes<ReturnType<typeof buttonGroupProps>>;
