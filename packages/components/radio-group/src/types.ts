import { ExtractPropTypes, PropType } from "vue";
import { radioCommonProps } from "@nimble-ui/tokens";
import { mergeCommonProp } from "@nimble-ui/utils";
import { RadioProps } from "@nimble-ui/components/radio";

const radioGroupProps = mergeCommonProp({
  ...radioCommonProps,
  /**
   * @description radio列表配置
   */
  options: {
    type: Array as PropType<RadioProps[]>,
  },
  /**
   * @description 是否竖直排列
   */
  vertical: {
    type: Boolean,
  },
});

export default radioGroupProps;

export type RadioGroupProps = ExtractPropTypes<ReturnType<typeof radioGroupProps>>;
