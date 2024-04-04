import { ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";
import { TriggerType } from "@nimble-ui/components/tooltip";
import { contentProps } from "@nimble-ui/components/tooltip/src/props";

const contentProp = contentProps();
export const contentPropsKey = Object.keys(contentProp);
export interface DropdownOptionsItem {
  disabled?: boolean;
  label?: VNodeChild | (() => VNodeChild);
  show?: boolean | (() => boolean);
  [key: string]: any;
}

const dropdownProps = mergeCommonProp({
  ...contentProp,
  value: {
    type: [String, Number],
  },
  trigger: {
    type: String as PropType<TriggerType>,
  },
  /**
   * @description 菜单配置项
   */
  options: {
    type: Array as PropType<Array<DropdownOptionsItem>>,
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
