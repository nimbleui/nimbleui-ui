import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const dividerProps = mergeCommonProp({
  direction: {
    type: String as PropType<"left" | "center" | "right">,
    default: "center",
  },
});

export default dividerProps;

export type DividerProps = ExtractPropTypes<ReturnType<typeof dividerProps>>;
