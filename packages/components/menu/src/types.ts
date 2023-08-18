import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, PropType, VNodeChild } from "vue";
import { subMenu, commonProps, type MenuItems } from "./props";

export { MenuItems };
const menuProps = mergeCommonProp({
  ...subMenu,
  ...commonProps,
  /**
   * @description 菜单的数据
   */
  items: {
    type: Array as PropType<MenuItems[]>,
  },
  /**
   * @description 是否使用手风琴模式
   */
  accordion: Boolean as PropType<boolean>,
  /**
   * @description 菜单是否折叠
   */
  collapsed: Boolean as PropType<boolean>,
  /**
   * @description 批量处理菜单标签渲染
   */
  renderLabel: {
    type: Function as PropType<(item: MenuItems) => VNodeChild>,
  },
});

export default menuProps;

export type MenuProps = ExtractPropTypes<ReturnType<typeof menuProps>>;
