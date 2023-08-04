import { Ref, reactive, ref } from "vue";
import { useEventListener } from "./useEventListener";

interface DataType {
  startX: number;
  startY: number;
  moveX: number;
  moveY: number;
  disX: number;
  disY: number;
  endX: number;
  endY: number;
}

interface Options {
  up?: (data: DataType, e: Event) => void;
  move?: (data: DataType, e: Event) => void;
  down?: (data: DataType, e: Event) => void;
}

export function useMouseMove(el: Ref<HTMLElement | undefined> | EventTarget, options?: Options) {
  const isMove = ref(false);
  const data = reactive<DataType>({
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    disX: 0,
    disY: 0,
    endX: 0,
    endY: 0,
  });

  const mouseup = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    isMove.value = true;
    data.startX = clientX;
    data.startY = clientY;
    options?.up?.(data, e);
  };

  const mousemove = (e: MouseEvent) => {
    if (!isMove.value) return;
    const { clientX, clientY } = e;

    Object.assign(data, {
      moveX: clientX,
      moveY: clientY,
      disX: clientX - data.startX,
      disY: clientY - data.startY,
    });
    options?.move?.(data, e);
  };
  const mousedown = (e: MouseEvent) => {
    isMove.value = false;
    options?.down?.(data, e);
  };

  useEventListener("mouseup", mouseup, { target: el });
  useEventListener("mousemove", mousemove, { target: el });
  useEventListener("mousedown", mousedown, { target: el });

  return {
    data,
    isMove,
  };
}
