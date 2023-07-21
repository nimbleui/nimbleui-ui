import { computed, ref } from "vue";
import { useGlobalConfig } from "./useGlobalConfig";

const zIndex = ref(0);

export function useCreateIndex() {
  const initZIndex = useGlobalConfig("zIndex", 2000);
  const currentZIndex = computed(() => initZIndex.value + zIndex.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    currentZIndex,
    nextZIndex,
  };
}
