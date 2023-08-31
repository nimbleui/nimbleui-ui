import { h, type Slots } from "vue";
import { pick, keysOf } from "@nimble-ui/utils";
import YSubMenu from "./subMenu";
import YMenuItem from "./menuItem";

import { MenuItems, MenuProps } from "./types";
import { subMenuProps, menuItemProps } from "./props";

type Props = MenuProps & { nodeIndent?: number; site: number[]; item?: MenuItems; slots: Slots };

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
