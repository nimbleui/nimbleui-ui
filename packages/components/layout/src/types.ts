import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const layoutProps = mergeCommonProp({
  // 这是参数模板
  /**
   * @description 总列数
   */
  column: {
    type: Number,
    default: 0,
  },
});

export default layoutProps;

export type LayoutProps = ExtractPropTypes<ReturnType<typeof layoutProps>>;
