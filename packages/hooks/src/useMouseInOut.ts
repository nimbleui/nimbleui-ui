import { ComponentPublicInstance, Ref, onBeforeMount, onMounted, ref } from "vue";

export function useMouseInOut(el: Ref<HTMLElement | ComponentPublicInstance | undefined>) {
  const isEnter = ref(false);

  function enter() {
    isEnter.value = true;
  }

  function leave() {
    isEnter.value = false;
  }

  onMounted(() => {
    const { value } = el;
    const node = value instanceof HTMLElement ? value : value?.$el;
    if (node) {
      node.addEventListener("mouseenter", enter);
      node.addEventListener("mouseleave", leave);
    }
  });

  onBeforeMount(() => {
    const { value } = el;
    const node = value instanceof HTMLElement ? value : value?.$el;
    if (node) {
      node.removeEventListener("mouseenter", enter);
      node.removeEventListener("mouseleave", leave);
    }
  });

  return { isEnter };
}
