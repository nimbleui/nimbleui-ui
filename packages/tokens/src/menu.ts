import type { ComputedRef, InjectionKey } from "vue";

type KeyType = string | number | symbol | undefined;
interface MenuContext {
  onItemClick: (site: number[], item: any, key?: KeyType) => void;
  onSubClick: (site: number[], item: any, isAllOpen?: boolean) => void;
  selectSite: Array<string>;
  activeSite: Array<number>;
  activeKey: ComputedRef<KeyType>;
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol("menuContextKey");
