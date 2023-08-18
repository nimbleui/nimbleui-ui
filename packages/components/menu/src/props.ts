import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, HTMLAttributes, PropType, Slots, VNode } from "vue";

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
  /**
   * @description 菜单每级的缩进
   */
  indent: {
    type: Number,
    default: 24,
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
  /**
   * @description 是否展开全部菜单
   */
  allOpen: Boolean as PropType<boolean>,
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
  /**
   * @description 插槽
   */
  slots: {
    type: Object as PropType<Slots>,
    required: true,
  },
} as const);

export type SubMenuProps = ExtractPropTypes<ReturnType<typeof subMenuProps>>;

export const menuItemProps = mergeCommonProp({
  ...commonProps,
  ...itemProps,
  /**
   * @description 插槽
   */
  slots: {
    type: Object as PropType<Slots>,
    required: true,
  },
} as const);
export type MenuItemProps = ExtractPropTypes<ReturnType<typeof menuItemProps>>;
