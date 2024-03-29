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
  modelValue: {
    type: String,
    default: "#1677ff",
  },
  /**
   * @description 弹框的方向
   */
  placement: {
    type: String as PropType<"bottom-start" | "bottom-end">,
    default: "bottom-start",
  },
  /**
   * @description 禁用颜色选择器
   */
  disabled: {
    type: Boolean,
  },
});

export default colorPickerProps;

export type ColorPickerProps = ExtractPropTypes<ReturnType<typeof colorPickerProps>>;
