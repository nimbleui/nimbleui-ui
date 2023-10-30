import { ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

const switchProps = mergeCommonProp({
  /**
   * @description 开关选中状态
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
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
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
  },
  /**
   * @description 打开时的文字描述
   */
  checkedText: {
    type: String,
  },
  /**
   * @description 关闭时的文字描述
   */
  uncheckedText: {
    type: String,
  },
  /**
   * @description 是否加载
   */
  loading: {
    type: Boolean,
  },
});

export default switchProps;
export type SwitchProps = ExtractPropTypes<ReturnType<typeof switchProps>>;
