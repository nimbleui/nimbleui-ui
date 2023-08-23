import { Fragment, cloneVNode, defineComponent, inject, ref, withDirectives } from "vue";
import type { PropType, VNode, ObjectDirective } from "vue";
import { isObject } from "@yy/utils";
import type { TriggerType } from "./types";

import { tooltipContextKey } from "@yy/tokens";

export default defineComponent({
  name: "YTrigger",
  props: {
    trigger: {
      type: [String, Array] as PropType<TriggerType | Array<TriggerType>>,
      default: "click",
    },
  },
  emits: ["toggle"],
  setup(props, ctx) {
    const elementRef = ref<HTMLElement>();
    const tooltipContext = inject(tooltipContextKey);
    function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
      if (!node) return null;
      const children = node as VNode[];
      for (const child of children) {
        if (isObject(child)) {
          switch (child.type) {
            case Comment:
              continue;
            case Text:
              return <span>{child}</span>;
            case Fragment:
              return findFirstLegitChild(child.children as VNode[]);
            default:
              return child;
          }
        }
        return <span>{child}</span>;
      }
      return null;
    }

    const directive = (): ObjectDirective => {
      return {
        mounted(el) {
          tooltipContext?.setRef(el);
          elementRef.value = el;
        },
        updated(el) {
          tooltipContext?.setRef(el);
          elementRef.value = el;
        },
        unmounted() {
          tooltipContext?.setRef(null as any);
          elementRef.value = undefined;
        },
      };
    };
    const getLocationInfo = (e: Event) => {
      const el = e.target as HTMLElement;

      let width = el.offsetWidth;
      let height = el.offsetHeight;
      let parent: HTMLElement = el;
      while (parent !== elementRef.value) {
        if (width < parent.offsetWidth) {
          width = parent.offsetWidth;
        }
        if (height < parent.offsetHeight) {
          height = parent.offsetHeight;
        }

        parent = el.parentElement as HTMLElement;
      }

      const rect = parent.getBoundingClientRect();

      if (tooltipContext) {
        tooltipContext.rectInfo = {
          width: rect.width,
          height: rect.height,
        };
      }
    };

    const handleEvent = (e: Event) => {
      e.stopPropagation();
      const { type: eventType } = e;
      const { trigger } = props;

      if (trigger === "click" && eventType === "click") {
        ctx.emit("toggle", e, true);
        getLocationInfo(e);
      } else if (trigger === "hover") {
        if (eventType === "mouseenter") {
          ctx.emit("toggle", e, true);
          getLocationInfo(e);
        } else if (eventType === "mouseleave") {
          ctx.emit("toggle", e, false);
        }
      } else if (trigger === "focus") {
        if (eventType === "focus") {
          ctx.emit("toggle", e, true);
          getLocationInfo(e);
        } else if (eventType === "blur") {
          ctx.emit("toggle", e, false);
        }
      }
    };

    return () => {
      const children = ctx.slots.default?.();
      if (!children) return null;
      if (children.length > 1) return null;

      const firstLegitNode = findFirstLegitChild(children);
      if (!firstLegitNode) return null;

      return withDirectives(
        cloneVNode(firstLegitNode, {
          ...ctx.attrs,
          onBlur: handleEvent,
          onClick: handleEvent,
          onFocus: handleEvent,
          onKeydown: handleEvent,
          onMouseleave: handleEvent,
          onMouseenter: handleEvent,
          onContextmenu: handleEvent,
        }),
        [[directive()]]
      );
    };
  },
});
