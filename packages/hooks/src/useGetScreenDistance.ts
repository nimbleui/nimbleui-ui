import { onMounted, reactive, ref } from "vue";
import { getScrollParent } from "@yy/utils";

import type { Ref } from "vue";
import { useEventListener } from "./useEventListener";

function getScreenSize() {
  const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
  const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
  return { clientHeight, clientWidth };
}

function sunScreenDistance(targe: HTMLElement, isFirst?: boolean) {
  const { clientHeight, clientWidth } = getScreenSize();
  const { bottom, right, left, top, width, height } = targe.getBoundingClientRect();

  return {
    width,
    height,
    disScreeTop: top,
    disScreeLeft: left,
    disScreeRight: clientWidth - right,
    disScreeBottom: clientHeight - bottom,
  };
}

/**
 * 获取目标元素大小、距离信息
 * @param targe 目标元素
 * @returns
 */
export function useGetScreenDistance(targe: Ref<HTMLElement | undefined>) {
  const scrollEl = ref<Window | Element>();
  const screenRect = reactive({
    disScreeTop: 0,
    disScreeLeft: 0,
    disScreeRight: 0,
    disScreeBottom: 0,

    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0,
  });

  const handleScroll = () => {
    if (targe.value) {
      Object.assign(screenRect, sunScreenDistance(targe.value));
    }
  };

  useEventListener("scroll", handleScroll, {
    target: scrollEl,
    passive: true,
  });
  onMounted(() => {
    if (targe.value) {
      scrollEl.value = getScrollParent(targe.value);

      Object.assign(screenRect, sunScreenDistance(targe.value));
    }
  });

  return { screenRect };
}
