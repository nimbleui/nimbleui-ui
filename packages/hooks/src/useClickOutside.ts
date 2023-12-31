import { Ref } from "vue";
import { useEventListener } from "./useEventListener";

type TargetType = Ref<HTMLElement | null> | HTMLElement;

function useClickOutside(target: TargetType | Array<TargetType>, handle: () => void) {
  useEventListener("mousedown", () => {
    console.log(111);
  });
}
