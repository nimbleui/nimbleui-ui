import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";
import { TriggerType } from "@yy/components/tooltip";

const dropdownProps = mergeCommonProp({
  trigger: {
    type: String as PropType<TriggerType>,
  },
  teleported: {
    type: String,
  },
});

export default dropdownProps;

export type DropdownProps = ExtractPropTypes<ReturnType<typeof dropdownProps>>;
