import { nextTick, onMounted, reactive, ref, unref, watch } from "vue";
import type { ComputedRef, Ref } from "vue";

export function useGetHideElementRect(showRef: ComputedRef<boolean> | Ref<boolean>, el?: Ref<HTMLElement | undefined>) {
  const show = ref(false);
  const visible = ref(false);

  const rect = reactive({
    width: 0,
    height: 0,
  });

  const getRect = () => {
    if (showRef.value) return;
    visible.value = true;
    show.value = true;
    nextTick(() => {
      const r = unref(el)?.getBoundingClientRect();
      console.log(r);
      if (r?.height && r?.width) {
        rect.width = r.width;
        rect.height = r.height;
      }

      show.value = false;
      setTimeout(() => (visible.value = false));
    });
  };

  watch(showRef, (val) => (show.value = val), { immediate: true });

  onMounted(() => {
    getRect();
  });

  return {
    show,
    visible,
    rect,
  };
}
