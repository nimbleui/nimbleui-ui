import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const numberProps = mergeCommonProp({
  /**
   * @description 标记数量
   */
  count: {
    type: [Number, String],
  },
  /**
   * @description 展示封顶的数字值
   */
  max: {
    type: [String, Number],
  },
});

export default numberProps;

export type NumberProps = ExtractPropTypes<ReturnType<typeof numberProps>>;
