import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";
import { TriggerType } from "@yy/components/tooltip";
import { contentProps } from "@yy/components/tooltip/src/props";

const dropdownProps = mergeCommonProp({
  ...contentProps(),
  trigger: {
    type: String as PropType<TriggerType>,
  },
  /**
   * @description 菜单配置项
   */
  options: {
    type: Array as PropType<Array<{ [key: string]: any }>>,
  },
  /**
   * @description label 的字段名
   */
  labelField: {
    type: String,
    default: "label",
  },
  /**
   * @description key 的字段名
   */
  keyField: {
    type: String,
    default: "id",
  },
  /**
   * @description 菜单最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: 200,
  },
});

export default dropdownProps;

export type DropdownProps = ExtractPropTypes<ReturnType<typeof dropdownProps>>;