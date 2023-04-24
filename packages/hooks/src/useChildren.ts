import { ComponentInternalInstance, ComponentPublicInstance, InjectionKey, provide, reactive } from "vue";
import type { ChildrenItem } from "@yy/tokens";

export function useChildren<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>,
  ProvideValue = never
>(key: InjectionKey<ProvideValue>) {
  const children: ChildrenItem<Child>[] = reactive([]);

  const linkChildren = (value?: ProvideValue) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        children.push({
          instance: child,
          proxy: child.proxy as any,
        });
      }
    };

    const unlink = (child: ComponentInternalInstance) => {
      const index = children.findIndex((item) => item.instance == child);
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
