import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const timePickerProps = mergeCommonProp({
  modelValue: {
    type: [String, Number],
  },
  /**
   * @description 展示的时间格式
   */
  format: {
    type: String,
    default: "hh:mm:ss",
  },
  /**
   * @description 是否可以清除
   */
  allowClear: {
    type: Boolean,
  },
  /**
   * @description 选择框的占位符
   */
  placeholder: {
    type: String,
  },
});

export default timePickerProps;

export type TimePickerProps = ExtractPropTypes<ReturnType<typeof timePickerProps>>;
