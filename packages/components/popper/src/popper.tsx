import { createNamespace } from "@nimble-ui/utils";
import { Transition, defineComponent, ref, Teleport, reactive, CSSProperties, nextTick, computed } from "vue";
import { OnlyChildEventFn, YOnlyChild } from "@nimble-ui/components/slot";
import { useLazyRender } from "@nimble-ui/hooks";

import popperProps from "./types";
import { computePosition } from "./dimensions";

export default defineComponent({
  name: "YPopper",
  props: popperProps(),
  setup(props, ctx) {
    const bem = createNamespace("popper");
    const triggerRef = ref<Element | null>(null);
    const contentRef = ref<Element | null>(null);

    const selfModel = ref(false);
    const show = computed({
      get: () => props.modelValue ?? selfModel.value,
      set(val) {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });
    const styles = reactive<CSSProperties>({});

    const handlePosition = () => {
      nextTick(() => {
        if (triggerRef.value && contentRef.value) {
          const { placement } = props;

          // const [start, end] = placement.split("-");
          // styles.transformOrigin = `${start} ${end ? (end == "end" ? "" : "") : "center"}`;

          const { x, y } = computePosition(triggerRef.value, contentRef.value, {
            placement,
          });
          styles.top = `${y}px`;
          styles.left = `${x}px`;
        }
      });
    };

    const onEvent: OnlyChildEventFn = (type, e) => {
      if (type === "element") {
        triggerRef.value = e as Element;
      } else if (type == "click") {
        show.value = !show.value;
        handlePosition();
      }
    };

    const { lazyRender } = useLazyRender(show);
    const renderContent = lazyRender(() => (
      <Transition appear name="y-tooltip">
        <div v-show={show.value} class={bem.e("content")} style={styles} ref={contentRef}>
          {ctx.slots.content?.()}
        </div>
      </Transition>
    ));

    return () => {
      return (
        <>
          <YOnlyChild onEvent={onEvent}>{ctx.slots.default?.()}</YOnlyChild>
          <Teleport to={"body"}>{renderContent()}</Teleport>
        </>
      );
    };
  },
});
