import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const cardProps = mergeCommonProp({
  // 这是参数模板
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
});

export default cardProps;

// 给组件ref智能提示
export type cardExpose = {};

export type CardProps = ExtractPropTypes<ReturnType<typeof cardProps>>;
