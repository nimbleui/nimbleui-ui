import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, StyleValue } from "vue";

const numberProps = mergeCommonProp({
  /**
   * @description 标记数量
   */
  count: {
    type: [Number, String],
  },
  /**
   * @description 展示封顶的数字值
   */
  max: {
    type: [String, Number],
  },
  /**
   * @description 数字的类名
   */
  numberClass: {
    type: [String, Array, Object],
  },
  /**
   * @description 数字的样式
   */
  numberStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
  /**
   * @description 数字间的间隙
   */
  gap: {
    type: [Number, String],
  },
});

export default numberProps;

export type NumberProps = ExtractPropTypes<ReturnType<typeof numberProps>>;
