import { ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

const switchProps = mergeCommonProp({
  /**
   * @description 开关选中状态
   */
  modelValue: {
    type: [String, Number],
  },
  /**
   * @description 打开时对应的值
   */
  checkedValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description 关闭时对应的值
   */
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: false,
  },
});

export default switchProps;
export type SwitchProps = ExtractPropTypes<ReturnType<typeof switchProps>>;
