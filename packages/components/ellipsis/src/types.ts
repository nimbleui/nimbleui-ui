import { ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

const ellipsisProps = mergeCommonProp({
  /**
   * @description 最大行数
   */
  lineClamp: {
    type: Number,
    default: 0,
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
