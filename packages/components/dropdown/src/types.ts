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

export interface DropdownOptionItem {
  key?: string | number;
  label?: string;
  disabled?: boolean;
  show?: boolean;
  type?: string;
  render?: () => VNodeChild;
  children?: Array<DropdownOptionItem>;
  [key: string]: any;
}

const commonProp = {
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
   * @description children 的字段名
   */
  childrenKey: {
    type: String,
    default: "children",
  },
};

const dropdownProps = mergeCommonProp({
  ...contentProp,
  ...commonProp,
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
    type: Array as PropType<Array<DropdownOptionItem>>,
  },
  maxHeight: {
    type: [String, Number],
    default: 200,
  },
});

export const dropdownMenuProps = {
  ...commonProp,
  options: {
    type: Array as PropType<Array<DropdownOptionItem>>,
  },
} as const;

export const dropdownOptionProps = {
  ...commonProp,
  item: {
    type: Object as PropType<DropdownOptionItem>,
    required: true,
  },
  domEl: {
    type: Object as PropType<HTMLDivElement>,
  },
} as const;

export default dropdownProps;

export type DropdownProps = ExtractPropTypes<ReturnType<typeof dropdownProps>>;
