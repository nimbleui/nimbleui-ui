import { ExtractPropTypes, PropType } from "vue";
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
  /**
   * @description 展开的触发方式
   */
  trigger: {
    type: String as PropType<"click">,
  },
});

export default ellipsisProps;

export type EllipsisProps = ExtractPropTypes<ReturnType<typeof ellipsisProps>>;
