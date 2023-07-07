import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

import { contentProps } from "./props";

export type TriggerType = "hover" | "click" | "focus" | "contextmenu";

const tooltipProps = mergeCommonProp({
  ...contentProps(),
  trigger: {
    type: String as PropType<TriggerType>,
  },
});

export default tooltipProps;
export type TooltipProps = ExtractPropTypes<ReturnType<typeof tooltipProps>>;
