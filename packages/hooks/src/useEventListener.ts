import { onMounted, onUnmounted, Ref, unref, onDeactivated, isRef, watch } from "vue";

type TargetRef = EventTarget | Ref<EventTarget | undefined>;
type Options = {
  target?: TargetRef;
  capture?: boolean;
  passive?: boolean;
};

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options: Options = {}
) {
  const { target = document, passive = false, capture = false } = options;

  let attached: boolean;
  const add = (target?: TargetRef) => {
    const element = unref(target);

    if (element && !attached) {
      element.addEventListener(type, listener as any, {
        capture,
        passive,
      });
      attached = true;
    }
  };

  const remove = (target?: TargetRef) => {
    const element = unref(target);

    if (element && attached) {
      element.removeEventListener(type, listener as any, capture);
      attached = false;
    }
  };

  onUnmounted(() => remove(target));
  onDeactivated(() => remove(target));
  onMounted(() => add(target));

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }
}
