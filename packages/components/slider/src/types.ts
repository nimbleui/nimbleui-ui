import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, VNodeChild } from "vue";

const sliderProps = mergeCommonProp({
  /**
   * @description 选中项绑定值
   */
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
  /**
   * @description 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 垂直模式
   */
  vertical: {
    type: Boolean,
  },
  /**
   * @description slider上的标记
   */
  marks: {
    type: Object as PropType<{ [key: number]: VNodeChild | (() => VNodeChild) }>,
  },
  /**
   * @description 格式化 tooltip
   */
  formatTooltip: {
    type: Function as PropType<(value: number) => VNodeChild>,
  },
  /**
   * @description 是否一直显示 tooltip
   */
  showTooltip: {
    type: Boolean,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
  },
});

export default sliderProps;

export type SliderProps = ExtractPropTypes<ReturnType<typeof sliderProps>>;
