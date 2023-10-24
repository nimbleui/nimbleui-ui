import { radioCommonProps } from "@nimble-ui/tokens";
import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, VNodeChild } from "vue";

const radioProps = mergeCommonProp({
  ...radioCommonProps,
  /**
   * @description 标签
   */
  label: {
    type: [Object, Function] as PropType<VNodeChild | (() => VNodeChild)>,
  },
  /**
   * @description 选中的值
   */
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
});

export default radioProps;

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>;
