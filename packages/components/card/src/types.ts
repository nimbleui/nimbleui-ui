import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType, StyleValue } from "vue";

const cardProps = mergeCommonProp({
  contentClass: {
    type: [String, Array, Object],
  },
  contentStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
});

export default cardProps;

// 给组件ref智能提示
// export type cardExpose = {};

export type CardProps = ExtractPropTypes<ReturnType<typeof cardProps>>;
