import { isArray } from "@nimble-ui/utils";
import { Ref, onMounted, onUnmounted, unref } from "vue";

type TargetType = Ref<Element | null | undefined>;
export const useClickOutside = (element: TargetType | TargetType[], callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (isArray(element)) {
      if (!element.some((el) => unref(el)?.contains(e.target as Element))) {
        callback(e);
      }
      return;
    }

    if (!unref(element)?.contains(e.target as Element)) {
      callback(e);
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
};
