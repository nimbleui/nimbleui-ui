import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const selectProps = mergeCommonProp({
  // 这是参数模板
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
});

export default selectProps;

// 给组件ref智能提示
export type selectExpose = {};

export type SelectProps = ExtractPropTypes<ReturnType<typeof selectProps>>;
