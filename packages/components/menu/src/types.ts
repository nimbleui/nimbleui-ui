import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, HTMLAttributes, PropType, VNode } from "vue";

export interface MenuItems {
  key?: string | number;
  children?: Array<MenuItems>;
  show?: boolean;
  props?: HTMLAttributes;
  icon?: () => VNode;
  label?: () => VNode | string;
  disabled?: () => boolean | boolean;
  [key: string]: unknown;
}

const menuProps = mergeCommonProp({
  /**
   * @description 菜单的数据
   */
  items: {
    type: Array as PropType<MenuItems[]>,
  },
  /**
   * @description key 的字段名
   */
  keyField: {
    type: String,
    default: "id",
  },
  /**
   * @description label 的字段名
   */
  labelField: {
    type: String,
    default: "label",
  },
  /**
   * @description 菜单的布局方式
   */
  mode: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "vertical",
  },
});

export default menuProps;

export type MenuProps = ExtractPropTypes<ReturnType<typeof menuProps>>;
