import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, PropType } from "vue";

const layoutProps = mergeCommonProp({
  /**
   * @description 是否固定头部
   */
  position: {
    type: String as PropType<"static" | "absolute">,
    default: "static",
  },
  /**
   * @description 组件内部是否有边栏
   */
  hasSidebar: {
    type: Boolean,
  },
});

export default layoutProps;

export type LayoutProps = ExtractPropTypes<ReturnType<typeof layoutProps>>;
