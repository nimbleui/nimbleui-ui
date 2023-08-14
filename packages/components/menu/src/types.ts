import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, PropType } from "vue";
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
  accordion: {
    type: Boolean as PropType<boolean>,
  },
});

export default menuProps;

export type MenuProps = ExtractPropTypes<ReturnType<typeof menuProps>>;
