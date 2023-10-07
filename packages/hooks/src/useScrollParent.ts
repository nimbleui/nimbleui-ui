import { Ref, isRef, onMounted, ref, unref, watch } from "vue";
import { getScrollParent, isString } from "@nimble-ui/utils";
import { useEventListener } from "./useEventListener";

type ScrollElement = HTMLElement | Window;
export function useScrollParent(
  el: Ref<Element | string | undefined>,
  handle: (e: Event) => void,
  root?: ScrollElement | undefined
) {
  const scrollParent = ref<Element | Window>();

  useEventListener("scroll", handle, {
    target: scrollParent,
  });

  function init() {
    const warp = unref(el);
    const scroll = isString(warp) ? document.querySelector(warp) : warp;
    if (scroll) {
      scrollParent.value = getScrollParent(scroll, undefined, root);
    }
  }

  onMounted(init);
  if (isRef(el)) {
    watch(el, () => init());
  }

  return scrollParent;
}
