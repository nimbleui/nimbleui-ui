import { createNamespace } from "@yy/utils";
import { CSSProperties, Transition, computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import messageProps from "./types";
import { getLastOffset, getOffsetOrSpace } from "./instance";

import { useResizeObserver } from "@yy/hooks";

export default defineComponent({
  name: "YMessage",
  props: messageProps(),
  emits: ["destroy"],
  setup(props, ctx) {
    const visible = ref(true);
    const height = ref(0);
    const bem = createNamespace("message");
    const messageRef = ref<HTMLElement>();

    const lastOffset = computed(() => getLastOffset(props.id));
    const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
    const bottom = computed(() => height.value + offset.value);
    const styles = computed<CSSProperties>(() => ({
      top: `${offset.value}px`,
      zIndex: props.zIndex,
    }));

    function close() {
      visible.value = false;
      props.onClose?.();
    }

    function startTimer() {
      if (props.duration === 0) return;
      setTimeout(() => {
        close();
      }, props.duration);
    }

    onMounted(() => {
      startTimer();
    });

    useResizeObserver(messageRef, () => {
      if (messageRef.value) {
        height.value = messageRef.value.getBoundingClientRect().height;
      }
    });

    ctx.expose({
      visible,
      close,
      bottom,
    });

    return () => {
      return (
        <Transition name="y-message-fade" onAfterLeave={() => ctx.emit("destroy")} appear>
          <div v-show={visible.value} class={bem.b()} style={styles.value} ref={messageRef}>
            {ctx.slots.default ? ctx.slots.default() : props.message}
          </div>
        </Transition>
      );
    };
  },
});
