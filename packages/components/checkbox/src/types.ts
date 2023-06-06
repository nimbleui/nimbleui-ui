import type { PropType, ExtractPropTypes } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";

type CheckerShape = "square" | "round";
type CheckerLabelPosition = "left" | "right";

const checkboxProps = mergeCommonProp({
  /**
   * @description 原生属性id
   */
  id: String,
  /**
   * @description 名称，作为提交表单时的标识符
   */
  name: String,
  /**
   * @description 绑定的value
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined,
  },
  /**
   * @description 文本位置
   */
  labelPosition: {
    type: String as PropType<CheckerLabelPosition>,
    default: "right",
  },
  /**
   * @description 形状
   */
  shape: {
    type: String as PropType<CheckerShape>,
  },
  /**
   * @description 按钮是否为禁用状态
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
  /**
   * @description 输入框侧边文本
   */
  label: mergeFunctionProp<string>(String),
  /**
   * @description 选中时的值
   */
  value: [String, Number],
});

export default checkboxProps;
export type CheckboxProps = ExtractPropTypes<ReturnType<typeof checkboxProps>>;
