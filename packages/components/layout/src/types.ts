import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const layoutProps = mergeCommonProp({
  /**
   * @description 组件内部是否有边栏
   */
  hasSidebar: {
    type: Boolean,
  },
});

export default layoutProps;

export type LayoutProps = ExtractPropTypes<ReturnType<typeof layoutProps>>;
