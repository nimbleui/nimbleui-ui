import { ExtractPropTypes, PropType } from "vue";

const expandTransitionProps = () => ({
  appear: Boolean,
  mode: String as PropType<"in-out" | "out-in" | "default">,
});

export default expandTransitionProps;

export type ExpandTransitionProps = ExtractPropTypes<ReturnType<typeof expandTransitionProps>>;
