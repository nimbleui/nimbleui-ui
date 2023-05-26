import { InjectionKey, inject, onUnmounted, provide, reactive, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import type { ProvideContext, ChildrenType } from "@yy/tokens";

type Key<T> = InjectionKey<ProvideContext<T>>;
type LinkChildren<T> = (value: T) => void;

function useChildren<T>(key: Key<T>): {
  linkChildren: LinkChildren<T>;
  children: ChildrenType[];
};
function useChildren<T>(
  key: Key<T>,
  isObject: boolean
): {
  linkChildren: (value: T) => void;
  children: ChildrenType;
};
function useChildren<T>(key: InjectionKey<ProvideContext<T>>, isObject?: boolean) {
  const childrenList: ChildrenType[] = reactive([]);
  const childrenObj = reactive<ChildrenType>({} as ChildrenType);

  const linkChildren = (value?: T) => {
    const link = (child: ComponentInternalInstance | null) => {
      if (!child?.proxy) return;

      const item = { internal: child, public: child.proxy };
      if (isObject) {
        Object.assign(childrenObj, item);
      } else {
        childrenList.push(item);
      }
    };

    const unlink = (child: ComponentInternalInstance | null) => {
      if (isObject) {
        Object.assign(childrenObj, { internal: null, public: null });
      } else {
        const index = childrenList.findIndex((item) => item.internal.uid == child?.uid);
        if (index > -1) {
          childrenList.splice(index, 1);
        }
      }
    };

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: isObject ? childrenObj : childrenList,
        },
        value
      )
    );
  };

  return {
    children: isObject ? childrenObj : childrenList,
    linkChildren,
  };
}

function useParent<T>(key: InjectionKey<ProvideContext<T>>) {
  const parent = inject(key, null);
  if (parent) {
    const instance = getCurrentInstance();
    const { link, unlink } = parent;

    link(instance);
    onUnmounted(() => unlink(instance));

    return {
      parent,
    };
  }

  return null;
}
export { useChildren, useParent };
