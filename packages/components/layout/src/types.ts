import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, PropType, StyleValue } from "vue";

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
  /**
   * @description 可滚动内容节点的类
   */
  contentClass: {
    type: [String, Array, Object] as PropType<any>,
  },
  /**
   * @description 可滚动内容节点的样式
   */
  contentStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
});

export default layoutProps;

export type LayoutProps = ExtractPropTypes<ReturnType<typeof layoutProps>>;
