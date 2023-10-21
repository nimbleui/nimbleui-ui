import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, VNodeChild } from "vue";

const radioProps = mergeCommonProp({
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
   * @description 标签
   */
  label: {
    type: [Object, Function] as PropType<VNodeChild | (() => VNodeChild)>,
  },
  /**
   * @description 选中的值
   */
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
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
    default: "end",
  },
});

export default radioProps;

export type RadioProps = ExtractPropTypes<ReturnType<typeof radioProps>>;
