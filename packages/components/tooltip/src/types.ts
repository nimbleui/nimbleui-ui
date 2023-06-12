import { ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@yy/utils";

const tooltipProps = mergeCommonProp({
  /**
   * @description 插入哪里
   */
  appendTo: {
    type: String,
  },
  /**
   * @description 是否使用teleport插入body元素
   */
  teleported: {
    type: Boolean,
    default: true,
  },
});

export default tooltipProps;
export type SwitchProps = ExtractPropTypes<ReturnType<typeof tooltipProps>>;
