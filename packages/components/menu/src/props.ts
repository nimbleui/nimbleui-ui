import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, HTMLAttributes, PropType, VNode } from "vue";

export const MENU_NODE_INDENT = 24;

export interface MenuItems {
  key?: string | number;
  children?: Array<MenuItems>;
  show?: boolean;
  props?: HTMLAttributes;
  icon?: (details: any) => VNode;
  label?: string | ((details: any) => VNode);
  disabled?: boolean | ((details: any) => boolean);
  [key: string]: unknown;
}

export const commonProps = {
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
} as const;

export const subMenu = {
  /**
   * @description children 的字段名
   */
  childrenField: {
    type: String,
    default: "children",
  },
  /**
   * @description 菜单的布局方式
   */
  mode: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "vertical",
  },
} as const;

const itemProps = {
  /**
   * @description 菜单的数据
   */
  item: {
    type: Object as PropType<MenuItems>,
  },
  /**
   * @description 节点的缩进
   */
  nodeIndent: {
    type: Number,
  },
  /**
   * @description 节点的位置
   */
  site: {
    type: Array as PropType<number[]>,
    required: true,
  },
} as const;

export const subMenuProps = mergeCommonProp({
  ...subMenu,
  ...commonProps,
  ...itemProps,
});

export type SubMenuProps = ExtractPropTypes<ReturnType<typeof subMenuProps>>;

export const menuItemProps = mergeCommonProp({
  ...commonProps,
  ...itemProps,
});
export type MenuItemProps = ExtractPropTypes<ReturnType<typeof menuItemProps>>;
