import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const radioGroupProps = mergeCommonProp({
  /**
   * @description 单选按钮 radio 元素的 name 属性。
   */
  name: String,
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
  },
  /**
   * @@description 禁用状态
   */
  disabled: Boolean,
  /**
   * @description 大小
   */
  size: {
    type: String as PropType<"small" | "medium" | "large">,
  },
  /**
   * @description 标签的位置
   */
  labelPosition: {
    type: String as PropType<"start" | "end">,
  },
});

export default radioGroupProps;

export type RadioGroupProps = ExtractPropTypes<ReturnType<typeof radioGroupProps>>;
