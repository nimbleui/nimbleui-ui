import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const descriptionsProps = mergeCommonProp({
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
  /**
   * 分隔符
   */
  separator: {
    type: String,
    default: ":",
  },
});

export default descriptionsProps;

export type DescriptionsProps = ExtractPropTypes<ReturnType<typeof descriptionsProps>>;
