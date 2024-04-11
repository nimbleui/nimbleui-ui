import { createNamespace, isObject } from "@nimble-ui/utils";
import { Fragment, VNode, defineComponent, withDirectives, Comment, Text, cloneVNode, PropType } from "vue";

interface EventsType {
  element: Element | null;
  click: Event;
  mouseenter: Event;
  mouseleave: Event;
  focus: Event;
  blur: Event;
}
export type OnlyChildEventFn = <T extends keyof EventsType>(type: T, e: EventsType[T]) => void;
export default defineComponent({
  name: "YOnlyChild",
  props: {
    onEvent: {
      type: Function as PropType<OnlyChildEventFn>,
    },
  },
  setup(props, ctx) {
    const events = {
      onBlur: (e: Event) => props.onEvent?.("blur", e),
      onClick: (e: Event) => props.onEvent?.("click", e),
      onFocus: (e: Event) => props.onEvent?.("focus", e),
      onMouseenter: (e: Event) => props.onEvent?.("mouseenter", e),
      onMouseleave: (e: Event) => props.onEvent?.("mouseleave", e),
    };

    return () => {
      const defaultSlot = ctx.slots.default?.();

      if (!defaultSlot) return null;

      if (defaultSlot.length > 1) {
        console.debug("只能有一个有效的节点");
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) return null;

      return withDirectives(cloneVNode(firstLegitNode, { ...ctx.attrs, ...events }), [
        [
          {
            mounted(el) {
              props.onEvent?.("element", el);
            },
            updated(el) {
              props.onEvent?.("element", el);
            },
            unmounted() {
              props.onEvent?.("element", null);
            },
          },
        ],
      ]);
    };
  },
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(child: string | VNode) {
  const bem = createNamespace("only-child");
  return <span class={bem.e("content")}>{child}</span>;
}
