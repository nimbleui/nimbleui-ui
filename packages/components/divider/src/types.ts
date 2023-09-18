import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const dividerProps = mergeCommonProp({
  /**
   * @description 标题的位置
   */
  direction: {
    type: String as PropType<"left" | "center" | "right">,
    default: "center",
  },
  /**
   * @description 是否使用虚线分割
   */
  dashed: {
    type: Boolean,
  },
  /**
   * @description 是否垂直分隔
   */
  vertical: {
    type: Boolean,
  },
});

export default dividerProps;

export type DividerProps = ExtractPropTypes<ReturnType<typeof dividerProps>>;
