import { Ref, onBeforeUnmount, watch } from "vue";

export function useResizeObserver(target: Ref<HTMLElement | undefined>, callback: ResizeObserverCallback) {
  let observer: ResizeObserver | undefined = new ResizeObserver(callback);

  const stopWatch = watch(target, (el) => {
    observer?.disconnect();
    if (el) {
      observer?.observe(el);
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = undefined;
    stopWatch();
  });
}

export function useMutationObserver(target: Ref<HTMLElement | undefined>, callback: MutationCallback) {
  let observer: MutationObserver | undefined = new MutationObserver(callback);

  const stopWatch = watch(target, (el) => {
    observer?.disconnect();
    if (el) {
      observer?.observe(el, { attributes: true, childList: true, subtree: true });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = undefined;
    stopWatch();
  });
}
