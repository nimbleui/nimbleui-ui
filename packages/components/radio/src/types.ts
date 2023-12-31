import { radioCommonProps } from "@nimble-ui/tokens";
import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, VNodeChild } from "vue";

const radioProps = mergeCommonProp({
  ...radioCommonProps,
  /**
   * @description 标签
   */
  label: {
    type: [Object, Function, String] as PropType<VNodeChild | ((details: any) => VNodeChild)>,
  },
  /**
   * @description 选中的值
   */
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
  hide: {
    type: [Boolean, Function] as PropType<((details: any) => boolean) | boolean>,
  },
});

export default radioProps;

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>;
