import { ExtractPropTypes } from "vue";
import { radioCommonProps } from "@nimble-ui/tokens";
import { mergeCommonProp } from "@nimble-ui/utils";

const radioGroupProps = mergeCommonProp({ ...radioCommonProps });

export default radioGroupProps;

export type RadioGroupProps = ExtractPropTypes<ReturnType<typeof radioGroupProps>>;
