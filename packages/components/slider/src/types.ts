import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, VNode } from "vue";

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
  marks: {
    type: Object as PropType<{ [key: number]: VNode | (() => VNode) }>,
  },
});

export default sliderProps;

export type SliderProps = ExtractPropTypes<ReturnType<typeof sliderProps>>;
