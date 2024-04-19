import { createNamespace } from "@nimble-ui/utils";
import { Transition, defineComponent, ref, Teleport, reactive, CSSProperties, computed } from "vue";
import { OnlyChildEventFn, YOnlyChild } from "@nimble-ui/components/slot";
import {
  computePositionAutoPlacement,
  computePositionOffset,
  useClickOutside,
  useComputePosition,
  useLazyRender,
  useScrollParent,
} from "@nimble-ui/hooks";

import popperProps from "./types";

export default defineComponent({
  name: "YPopper",
  props: popperProps(),
  setup(props, ctx) {
    const bem = createNamespace("popper");
    const triggerRef = ref<Element>();
    const contentRef = ref<Element>();

    const placement = computed(() => props.placement);
    const { computePosition } = useComputePosition(triggerRef, contentRef, {
      placement,
      middleware: [computePositionAutoPlacement(5), computePositionOffset(10)],
    });

    const selfModel = ref(false);
    const show = computed({
      get: () => props.modelValue ?? selfModel.value,
      set(val) {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });

    const styles = reactive<CSSProperties>({});
    const handlePosition = async () => {
      const { x, y } = await computePosition();
      styles.left = `${x}px`;
      styles.top = `${y}px`;
    };

    let time = 0;
    const onEvent: OnlyChildEventFn = (type, e) => {
      if (type === "element") {
        triggerRef.value = e as Element;
        return;
      }

      const { trigger } = props;
      switch (trigger) {
        case "click": {
          if (type == "click") {
            show.value = !show.value;
            handlePosition();
          }
          break;
        }
        case "hover": {
          clearTimeout(time);
          if (type == "mouseenter") {
            show.value = true;
            handlePosition();
          } else if (type === "mouseleave") {
            time = window.setTimeout(() => {
              show.value = false;
            }, 80);
          }
          break;
        }
        case "focus": {
          if (type == "focus") {
            show.value = true;
            handlePosition();
          } else if (type == "blur") {
            show.value = false;
          }
          break;
        }
      }
    };

    useScrollParent(triggerRef, handlePosition);
    useClickOutside([contentRef, triggerRef], (e) => {
      show.value = false;
      ctx.emit("outside", e);
    });

    const { lazyRender } = useLazyRender(show);
    const renderContent = lazyRender(() => (
      <Transition appear name={props.transition ?? "y-tooltip"}>
        <div
          style={styles}
          ref={contentRef}
          v-show={show.value}
          class={bem.e("content")}
          onMouseenter={(e) => onEvent("mouseenter", e)}
          onMouseleave={(e) => onEvent("mouseleave", e)}
        >
          {ctx.slots.content?.()}
        </div>
      </Transition>
    ));

    return () => {
      return (
        <>
          <YOnlyChild onEvent={onEvent}>{ctx.slots.default?.()}</YOnlyChild>
          <Teleport to={props.appendTo} disabled={props.teleported}>
            {renderContent()}
          </Teleport>
        </>
      );
    };
  },
});
