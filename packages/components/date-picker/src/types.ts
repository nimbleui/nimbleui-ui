import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

export type DatePickerType =
  | "time"
  | "timeRange"
  | "date"
  | "dateRange"
  | "month"
  | "monthRange"
  | "year"
  | "yearRange"
  | "decade"
  | "decadeRange";

export type DatePickerModelValue = string | number | Date | [string | number | Date, string | number | Date];

const datePickerProps = mergeCommonProp({
  /**
   * @description 总列数
   */
  type: {
    type: String as PropType<DatePickerType>,
    default: "",
  },
  /**
   * @description 绑定值，如果它是数组，长度是 2
   */
  modelValue: {
    type: [String, Number, Object, Array] as PropType<DatePickerModelValue>,
  },
  /**
   * @description 非范围选择时的占位内容
   */
  placeholder: {
    type: [String, Array] as PropType<string | [string, string]>,
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
  },
  /**
   * @description 判断该日期是否被禁用的函数
   */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
  },
});

export default datePickerProps;

export type DatePickerProps = ExtractPropTypes<ReturnType<typeof datePickerProps>>;
