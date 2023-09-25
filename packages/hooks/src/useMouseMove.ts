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
  maxMoveDisR: 0,
  maxMoveDisL: 0,
  maxMoveDisT: 0,
  maxMoveDisB: 0,
};

type DataType = typeof defaultData;
type TargetElement = Ref<HTMLElement | undefined> | HTMLElement;
type BoundaryElement = Element | Window;
interface Options {
  up?: (data: DataType, e: Event) => void;
  move?: (data: DataType, e: Event) => void;
  down?: (data: DataType, e: Event) => void;
  // 拖拽的边界
  boundary?: BoundaryElement | TargetElement;
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

const handleBoundary = (el: TargetElement, boundary?: BoundaryElement | TargetElement) => {
  const moveDis = { l: 0, r: 0, t: 0, b: 0 };

  const sunBoundary = () => {
    const element = unref(el);
    if (!element || !boundary) return;

    let boundaryT = 0;
    let boundaryL = 0;
    let boundaryR = document.documentElement.clientWidth;
    let boundaryB = document.documentElement.clientHeight;
    if (boundary !== window) {
      const { left, top, right, bottom } = (unref(boundary) as Element).getBoundingClientRect();
      boundaryT = top;
      boundaryL = left;
      boundaryR = right;
      boundaryB = bottom;
    }

    const rect = element.getBoundingClientRect();
    Object.assign(moveDis, {
      l: boundaryL - rect.left,
      r: boundaryR - rect.right,
      t: boundaryT - rect.top,
      b: boundaryB - rect.bottom,
    });
  };

  return {
    moveDis,
    sunBoundary,
  };
};

export function useMouseMove(el: TargetElement, options?: Options) {
  const isMove = ref(false);
  const data = reactive<DataType>({ ...defaultData });
  const { moveDis, sunBoundary } = handleBoundary(el, options?.boundary);

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
    e.preventDefault();
    const { clientX, clientY } = e;
    const disX = clientX - data.startX;
    const disY = clientY - data.startY;
    Object.assign(data, {
      disX: disX > 0 ? Math.min(moveDis.r, disX) : Math.max(moveDis.l, disX),
      disY: disY > 0 ? Math.min(moveDis.b, disY) : Math.max(moveDis.t, disY),
      moveX: clientX,
      moveY: clientY,
      maxMoveDisR: moveDis.r,
      maxMoveDisL: moveDis.l,
      maxMoveDisB: moveDis.b,
      maxMoveDisT: moveDis.t,
    });
    console.log(data);
    options?.move?.(data, e);
  };

  const mouseup = (e: MouseEvent) => {
    if (!isMove.value) return;
    isMove.value = false;
    e.preventDefault();
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
