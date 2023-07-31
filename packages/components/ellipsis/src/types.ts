import { ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@yy/utils";

const ellipsisProps = mergeCommonProp({
  /**
   * @description 最大行数
   */
  lineClamp: {
    type: Number,
  },
  /**
   * @description Tooltip的属性
   */
  tooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 最大宽度
   */
  maxWidth: {
    type: [String, Number],
  },
});

export default ellipsisProps;

export type EllipsisProps = ExtractPropTypes<ReturnType<typeof ellipsisProps>>;
