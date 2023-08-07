import { Ref, reactive, ref, unref } from "vue";
import { useEventListener } from "./useEventListener";

const defaultData = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  disX: 0,
  disY: 0,
  endX: 0,
  endY: 0,
  elDisX: 0,
  elDisY: 0,
};

type DataType = typeof defaultData;

interface Options {
  up?: (data: DataType, e: Event) => void;
  move?: (data: DataType, e: Event) => void;
  down?: (data: DataType, e: Event) => void;
}

export function useMouseMove(el: Ref<HTMLElement | undefined> | HTMLElement, options?: Options) {
  const isMove = ref(false);
  const data = reactive<DataType>({ ...defaultData });

  const getDisElement = (x: number, y: number) => {
    const element = unref(el);
    const rect = element?.getBoundingClientRect();
    if (rect) {
      Object.assign(data, {
        elDisY: y - rect.top,
        elDisX: x - rect.left,
      });
    }
  };

  const mousedown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    isMove.value = true;
    data.startX = clientX;
    data.startY = clientY;
    getDisElement(clientX, clientY);

    options?.down?.(data, e);
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
  const mouseup = (e: MouseEvent) => {
    isMove.value = false;
    options?.up?.(data, e);
    Object.assign(data, defaultData);
  };

  useEventListener("mouseup", mouseup, { target: el });
  useEventListener("mousemove", mousemove, { target: el });
  useEventListener("mousedown", mousedown, { target: el });

  return {
    data,
    isMove,
  };
}
