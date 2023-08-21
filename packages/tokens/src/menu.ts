import type { ComputedRef, InjectionKey } from "vue";

type KeyType = string | number | symbol | undefined;
interface MenuContext {
  onClick: (type: "item" | "sub", site: number[], key?: KeyType) => void;
  selectSite: Array<string>;
  activeSite: Array<number>;
  activeKey: ComputedRef<KeyType>;
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol("menuContextKey");
