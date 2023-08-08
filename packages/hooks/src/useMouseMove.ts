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
  maxDisX: 0,
  maxDisY: 0,
};

type DataType = typeof defaultData;
type TargetElement = Ref<HTMLElement | undefined> | HTMLElement;
type BoundaryElement = Element | Window;
interface Options {
  up?: (data: DataType, e: Event) => void;
  move?: (data: DataType, e: Event) => void;
  down?: (data: DataType, e: Event) => void;
  // 拖拽的边界
  boundary?: BoundaryElement;
}

const getDisElement = (el: TargetElement, data: DataType, x: number, y: number) => {
  const element = unref(el);
  const rect = element?.getBoundingClientRect();
  if (rect) {
    Object.assign(data, {
      elDisY: y - rect.top,
      elDisX: x - rect.left,
    });
  }
};

const handleBoundary = (el: TargetElement, boundary?: BoundaryElement) => {
  const boundaryData = { l: 0, r: 0, t: 0, b: 0 };

  const sunBoundary = () => {
    const element = unref(el);
    if (!element || !boundary) return;

    let boundaryT = 0;
    let boundaryL = 0;
    let boundaryR = window.innerWidth;
    let boundaryB = window.innerWidth;
    if (boundary !== window) {
      const { left, top, right, bottom } = (boundary as Element).getBoundingClientRect();
      boundaryT = top;
      boundaryL = left;
      boundaryR = right;
      boundaryB = bottom;
    }

    const { left, top, bottom, right } = element.getBoundingClientRect();
    Object.assign(boundaryData, {
      l: boundaryL - left,
      r: boundaryR - right,
      t: boundaryT - top,
      b: boundaryB - bottom,
    });
  };

  return {
    boundaryData,
    sunBoundary,
  };
};

export function useMouseMove(el: TargetElement, options?: Options) {
  const isMove = ref(false);
  const data = reactive<DataType>({ ...defaultData });

  const { boundaryData, sunBoundary } = handleBoundary(el, options?.boundary);
  const mousedown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    isMove.value = true;
    data.startX = clientX;
    data.startY = clientY;
    sunBoundary();
    getDisElement(el, data, clientX, clientY);

    options?.down?.(data, e);
  };

  const mousemove = (e: MouseEvent) => {
    if (!isMove.value) return;
    const { clientX, clientY } = e;
    const disX = clientX - data.startX;
    const disY = clientY - data.startY;
    Object.assign(data, {
      disX,
      disY,
      moveX: clientX,
      moveY: clientY,
      maxDisX: disX > 0 ? Math.min(disX, boundaryData.r) : Math.max(disX, boundaryData.l),
      maxDisY: disY > 0 ? Math.min(disY, boundaryData.b) : Math.max(disY, boundaryData.t),
    });

    options?.move?.(data, e);
  };

  const mouseup = (e: MouseEvent) => {
    if (!isMove.value) return;
    isMove.value = false;
    options?.up?.(data, e);
    Object.assign(data, defaultData);
  };

  useEventListener("mousedown", mousedown, { target: el });
  useEventListener("mouseup", mouseup, { target: document });
  useEventListener("mousemove", mousemove, { target: document });

  return {
    data,
    isMove,
  };
}
