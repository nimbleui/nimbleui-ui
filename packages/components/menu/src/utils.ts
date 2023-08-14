import { h } from "vue";
import { pick, keysOf } from "@yy/utils";
import YSubMenu from "./subMenu";
import YMenuItem from "./menuItem";

import { MenuItems, MenuProps } from "./types";
import { subMenuProps, menuItemProps } from "./props";

type Props = MenuProps & { nodeIndent?: number; site: number[]; item?: MenuItems };

export function itemRenderer(item: MenuItems | undefined, menuProps: Props) {
  if (!item) return null;

  const { childrenField } = menuProps;

  if (item[childrenField]) {
    return h(YSubMenu, {
      ...pick(menuProps, keysOf(subMenuProps())),
      item,
    });
  } else {
    return h(YMenuItem, {
      ...pick(menuProps, keysOf(menuItemProps())),
      item,
    });
  }
}
