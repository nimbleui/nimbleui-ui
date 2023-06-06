import { inject, onUnmounted, provide, reactive, getCurrentInstance } from "vue";
import type { ComponentInternalInstance, InjectionKey } from "vue";
import type { ProvideContext, ChildrenType } from "@yy/tokens";

type Key<T> = InjectionKey<ProvideContext<T>>;

function useChildren<T>(key: Key<ProvideContext<T>>) {
  const childrenList: ChildrenType[] = reactive([]);

  const linkChildren = (value?: T) => {
    const link = (child: ComponentInternalInstance | null) => {
      if (!child?.proxy) return;

      const item = { internal: child, public: child.proxy };
      childrenList.push(item);
    };

    const unlink = (child: ComponentInternalInstance | null) => {
      const index = childrenList.findIndex((item) => item.internal.uid == child?.uid);
      if (index > -1) {
        childrenList.splice(index, 1);
      }
    };

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: childrenList,
        },
        value
      )
    );
  };

  return {
    children: childrenList,
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
      instance,
      uid: instance?.uid,
    };
  }

  return null;
}
export { useChildren, useParent };
