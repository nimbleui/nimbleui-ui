import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";
import type { ButtonShape, ButtonTypes } from "@yy/tokens";

import { mergeFunctionProp, mergeCommonProp, Fun } from "@yy/utils";

const buttonGroupProps = mergeCommonProp({
  /**
   * @description 按钮组的显示内容
   */
  content: {
    type: [Function, String, Object] as PropType<string | VNodeChild | Fun<VNodeChild>>,
  },
  /**
   * @description 按钮类型
   */
  type: mergeFunctionProp<ButtonTypes>(String, "default"),
  /**
   * @description 按钮的形状
   */
  shape: mergeFunctionProp<ButtonShape>(String, "default"),
  /**
   * @description 禁用按钮
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
});

export default buttonGroupProps;
export type ButtonGroupProps = ExtractPropTypes<ReturnType<typeof buttonGroupProps>>;
