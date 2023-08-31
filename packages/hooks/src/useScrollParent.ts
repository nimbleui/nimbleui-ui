import { Ref, onMounted, ref } from "vue";
import { getScrollParent } from "@nimble-ui/utils";
import { useEventListener } from "./useEventListener";

type ScrollElement = HTMLElement | Window;
export function useScrollParent(
  el: Ref<Element | undefined>,
  handle: (e: Event) => void,
  root?: ScrollElement | undefined
) {
  const scrollParent = ref<Element | Window>();

  useEventListener("scroll", handle, {
    target: scrollParent,
  });

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, undefined, root);
    }
  });

  return scrollParent;
}
