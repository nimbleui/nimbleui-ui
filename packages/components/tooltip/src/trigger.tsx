import { Fragment, cloneVNode, defineComponent, inject, withDirectives } from "vue";
import type { PropType, VNode, ObjectDirective } from "vue";
import { isObject } from "@yy/utils";
import type { TriggerType } from "./types";

import { tooltipTriggerContextKey } from "@yy/tokens";

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
    const tooltipTriggerContext = inject(tooltipTriggerContextKey);
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
          tooltipTriggerContext?.setRef(el);
        },
        updated(el) {
          tooltipTriggerContext?.setRef(el);
        },
        unmounted() {
          tooltipTriggerContext?.setRef(null);
        },
      };
    };

    const handleEvent = (e: Event) => {
      const { type: eventType } = e;
      const { trigger } = props;

      if (trigger === "click" && eventType === "click") {
        ctx.emit("toggle", e, true);
      } else if (trigger === "hover") {
        if (eventType === "mouseenter") {
          ctx.emit("toggle", e, true);
        } else if (eventType === "mouseleave") {
          ctx.emit("toggle", e, false);
        }
      } else if (trigger === "focus") {
        if (eventType === "focus") {
          ctx.emit("toggle", e, true);
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
