import { Ref, onMounted, ref, unref } from "vue";
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

  onMounted(() => {
    const warp = unref(el);
    const scroll = isString(warp) ? document.querySelector(warp) : warp;
    if (scroll) {
      scrollParent.value = getScrollParent(scroll, undefined, root);
    }
  });

  return scrollParent;
}
