import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

const scrollbarProps = mergeCommonProp({
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "div",
  },
});

export default scrollbarProps;
export type ScrollbarProps = ExtractPropTypes<ReturnType<typeof scrollbarProps>>;
