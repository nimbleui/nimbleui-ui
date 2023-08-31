import { PropType, ExtractPropTypes } from "vue";
import type { VNodeChild } from "vue";
import type { ButtonShape, ButtonTypes, ButtonSize } from "@nimble-ui/tokens";

import { mergeFunctionProp, mergeCommonProp, Fun } from "@nimble-ui/utils";

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
  /**
   * @description 按钮的尺寸
   */
  size: mergeFunctionProp<ButtonSize>(String),
});

export default buttonGroupProps;
export type ButtonGroupProps = ExtractPropTypes<ReturnType<typeof buttonGroupProps>>;
