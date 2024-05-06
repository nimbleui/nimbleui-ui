import { createNamespace, isEmpty } from "@nimble-ui/utils";
import { Transition, defineComponent, ref, Teleport, reactive, CSSProperties, computed, watch } from "vue";
import { OnlyChildEventFn, YOnlyChild } from "@nimble-ui/components/slot";
import {
  computePositionAutoPlacement as autoPlacement,
  computePositionOffset as offset,
  useClickOutside,
  useComputePosition,
  useCreateIndex,
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
      middleware: [autoPlacement(5), offset(10)],
    });
    const { nextZIndex, currentZIndex } = useCreateIndex();

    const selfModel = ref(false);
    const show = computed({
      get: () => {
        const { modelValue, left, top, trigger } = props;
        if (trigger == "manual" && isEmpty(left) && isEmpty(top)) {
          return false;
        }
        return modelValue ?? selfModel.value;
      },
      set(val) {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });

    watch([() => props.left, () => props.top], (val) => {
      styles.left = `${val[0]}px`;
      styles.top = `${val[1]}px`;
    });

    const styles = reactive<CSSProperties>({});
    const handlePosition = async () => {
      if (props.trigger == "manual") return;
      nextZIndex();
      const { x, y } = await computePosition();
      styles.left = `${x}px`;
      styles.top = `${y}px`;
      styles.zIndex = currentZIndex.value;
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
    const renderContent = lazyRender(() => {
      const { transition, contentStyle = {}, contentClass } = props;
      return (
        <Transition appear name={transition ?? "y-tooltip"}>
          <div
            style={[styles, contentStyle]}
            ref={contentRef}
            v-show={show.value}
            class={[bem.e("content"), contentClass]}
            onMouseenter={(e) => onEvent("mouseenter", e)}
            onMouseleave={(e) => onEvent("mouseleave", e)}
          >
            <div class={bem.m("arrow")}></div>
            {ctx.slots.default?.()}
          </div>
        </Transition>
      );
    });

    return () => {
      return (
        <>
          <YOnlyChild onEvent={onEvent}>{ctx.slots.trigger?.()}</YOnlyChild>
          <Teleport to={props.appendTo} disabled={props.teleported}>
            {renderContent()}
          </Teleport>
        </>
      );
    };
  },
});
