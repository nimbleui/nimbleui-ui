import { CSSProperties, Transition, computed, defineComponent, onMounted, ref } from "vue";
import { useResizeObserver, useCreateIndex } from "@nimble-ui/hooks";
import { createNamespace } from "@nimble-ui/utils";

import messageProps from "./types";
import { getLastOffset, getOffsetOrSpace } from "./instance";

export default defineComponent({
  name: "YMessage",
  props: messageProps(),
  emits: ["destroy"],
  setup(props, ctx) {
    const visible = ref(false);
    const height = ref(0);
    const bem = createNamespace("message");
    const messageRef = ref<HTMLElement>();
    const { nextZIndex } = useCreateIndex();

    const zIndex = nextZIndex();
    const lastOffset = computed(() => getLastOffset(props.id));
    const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
    const bottom = computed(() => height.value + offset.value);
    const styles = computed<CSSProperties>(() => ({
      top: `${offset.value}px`,
      zIndex: props.zIndex || zIndex,
    }));

    function close() {
      visible.value = false;
    }

    function startTimer() {
      if (props.duration === 0) return;
      setTimeout(() => {
        close();
      }, props.duration);
    }

    onMounted(() => {
      startTimer();
      visible.value = true;
    });

    useResizeObserver(messageRef, () => {
      if (messageRef.value) {
        height.value = messageRef.value.getBoundingClientRect().height;
      }
    });

    ctx.expose({
      close,
      bottom,
    });

    return () => {
      const { onClose } = props;
      return (
        <Transition name="y-message-fade" onBeforeLeave={onClose} onAfterLeave={() => ctx.emit("destroy")} appear>
          <div v-show={visible.value} class={bem.b()} style={styles.value} ref={messageRef}>
            {ctx.slots.default ? ctx.slots.default() : props.message}
          </div>
        </Transition>
      );
    };
  },
});
