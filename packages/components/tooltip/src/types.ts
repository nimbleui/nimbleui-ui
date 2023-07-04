import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

export type TriggerType = "hover" | "click" | "focus" | "contextmenu";

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
  trigger: {
    type: String as PropType<TriggerType>,
  },
});

export default tooltipProps;
export type TooltipProps = ExtractPropTypes<ReturnType<typeof tooltipProps>>;
