import type { InjectionKey } from "vue";

interface MenuContext {
  onClick: (type: "item" | "sub", site: number[]) => void;
  selectSite: Array<string>;
  activeSite: Array<number>;
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol("menuContextKey");
