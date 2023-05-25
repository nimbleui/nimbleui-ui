import { InjectionKey, inject, onUnmounted, provide, reactive, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import type { ProvideContext, ChildrenType } from "@yy/tokens";

export function useChildren<T>(key: InjectionKey<ProvideContext<T>>) {
  const children: ChildrenType[] = reactive([]);
  const linkChildren = (value?: T) => {
    const link = (child: ComponentInternalInstance | null) => {
      if (child?.proxy) {
        children.push({
          internal: child,
          public: child.proxy,
        });
      }
    };

    const unlink = (child: ComponentInternalInstance | null) => {
      const index = children.findIndex((item) => item.internal.uid == child?.uid);
      if (index > -1) {
        children.splice(index, 1);
      }
    };

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children,
        },
        value
      )
    );
  };

  return {
    children,
    linkChildren,
  };
}

export function useParent<T>(key: InjectionKey<ProvideContext<T>>) {
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
