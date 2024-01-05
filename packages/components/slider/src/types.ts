import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const sliderProps = mergeCommonProp({
  // 这是参数模板
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
});

export default sliderProps;

// 给组件ref智能提示
export type sliderExpose = {};

export type SliderProps = ExtractPropTypes<ReturnType<typeof sliderProps>>;
