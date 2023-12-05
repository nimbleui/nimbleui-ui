import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType } from "vue";

const colorPickerProps = mergeCommonProp({
  /**
   * @description 颜色选择器的触发模式
   */
  trigger: {
    type: String as PropType<"hover" | "click">,
  },
  /**
   * @description 颜色格式
   */
  format: {
    type: String as PropType<"rgb" | "hex" | "hsb">,
  },
});

export default colorPickerProps;

export type ColorPickerProps = ExtractPropTypes<ReturnType<typeof colorPickerProps>>;
