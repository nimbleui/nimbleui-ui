import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

import { contentProps, type PlacementType } from "./props";

export type TriggerType = "hover" | "click" | "focus" | "contextmenu";

const tooltipProps = mergeCommonProp({
  ...contentProps(),
  trigger: {
    type: String as PropType<TriggerType>,
  },
  /***
   * @description Tooltip 组件是否禁用
   */
  disabled: {
    type: [Boolean, Function] as PropType<boolean | ((details: any) => boolean)>,
  },
  /**
   * @description 控制显示隐藏
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
});

export { PlacementType };
export default tooltipProps;
export type TooltipProps = ExtractPropTypes<ReturnType<typeof tooltipProps>>;
