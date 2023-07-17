import { ref, watch, WatchSource } from "vue";

type OptionsType = {
  isTransition?: boolean;
  destroyOnClose?: boolean;
  watchCallback?: (val: boolean | undefined) => void;
};

export function useLazyRender(show: WatchSource<boolean | undefined>, options: OptionsType = {}) {
  const rendered = ref(false);

  watch(
    show,
    (value) => {
      const { destroyOnClose, isTransition, watchCallback } = options;
      if (value) {
        rendered.value = value;
      }

      // 判断close是否要全部销毁子元素，如果有动画，要在外面等待动画执行完成再调用 destroy方法
      if (value == false && destroyOnClose && !isTransition) {
        rendered.value = false;
      }
      watchCallback?.(value);
    },
    { immediate: true }
  );

  const destroy = () => {
    if (options.destroyOnClose) {
      rendered.value = false;
    }
  };

  const lazyRender = (render: () => JSX.Element) => () => rendered.value ? render() : null;
  return {
    destroy,
    lazyRender,
  };
}
