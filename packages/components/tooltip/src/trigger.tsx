import { Fragment, PropType, VNode, cloneVNode, defineComponent } from "vue";
import { isObject } from "@yy/utils";
import type { TriggerType } from "./types";

type EventType = "blur" | "click" | "contextmenu" | "focus" | "mouseenter" | "mouseleave" | "keydown";
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
    function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
      if (!node) return null;
      const children = node as VNode[];
      for (const child of children) {
        if (isObject(child)) {
          switch (child.type) {
            case Comment:
              continue;
            case Text:
              return <span class="y-">{child}</span>;
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
    return () => {
      const children = ctx.slots.default?.();
      if (!children) return null;
      if (children.length > 1) return null;

      const firstLegitNode = findFirstLegitChild(children);
      if (!firstLegitNode) return null;

      const handleEvent = (e: Event, eventType: EventType) => {
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

      return cloneVNode(firstLegitNode, {
        ...ctx.attrs,
        onBlur: (e: Event) => handleEvent(e, "blur"),
        onClick: (e: Event) => handleEvent(e, "click"),
        onFocus: (e: Event) => handleEvent(e, "focus"),
        onKeydown: (e: Event) => handleEvent(e, "keydown"),
        onMouseleave: (e: Event) => handleEvent(e, "mouseleave"),
        onMouseenter: (e: Event) => handleEvent(e, "mouseenter"),
        onContextmenu: (e: Event) => handleEvent(e, "contextmenu"),
      });
    };
  },
});
