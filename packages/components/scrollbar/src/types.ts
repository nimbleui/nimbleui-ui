import { ExtractPropTypes, HTMLAttributes, PropType, StyleValue } from "vue";
import { mergeCommonProp } from "@yy/utils";

const scrollbarProps = mergeCommonProp({
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "div",
  },
  native: {
    type: Boolean,
  },
  contentClass: {
    type: [Array, Object, String] as PropType<HTMLAttributes["class"]>,
  },
  contentStyle: {
    type: [Array, Object, String] as PropType<StyleValue>,
  },
});

export default scrollbarProps;
export type ScrollbarProps = ExtractPropTypes<ReturnType<typeof scrollbarProps>>;
