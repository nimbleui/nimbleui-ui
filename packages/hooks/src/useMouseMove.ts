import { type Ref, reactive, ref, unref } from "vue";
import { useEventListener } from "./useEventListener";

const defaultData = {
  // 按下鼠标x轴位置
  startX: 0,
  // 按下鼠标y轴位置
  startY: 0,
  // 移动鼠标x轴位置
  moveX: 0,
  // 移动鼠标y轴位置
  moveY: 0,
  // 鼠标移动x轴的距离
  disX: 0,
  // 鼠标移动y轴的距离
  disY: 0,
  // 抬起鼠标x轴位置
  endX: 0,
  // 抬起鼠标y轴位置
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
  up?: (data: DataType, e: Event, target: HTMLElement) => void;
  move?: (data: DataType, e: Event, target: HTMLElement) => void;
  down?: (data: DataType, e: Event, target: HTMLElement) => void;
  /**
   * @description 拖拽的边界元素
   */
  boundary?: BoundaryElement | TargetElement;
  /**
   * @description 阻止默认事件
   */
  prevent?: boolean;
  /**
   * @description 阻止事件冒泡
   */
  stop?: boolean;
  /**
   * @description 配合boundary，移动是只能在boundary元素里移动
   */
  moveLimit?: boolean;
  /**
   * @description 缩放比例
   */
  scale?: Ref<number> | number;
  /**
   * @description 边界元素扩大
   */
  expand?: number;
  /**
   * @description 是否代理
   */
  agency?: boolean;
  /**
   * @description 代理处理目标元素
   * @param target 点击当前元素
   */
  agencyTarget?: (target: HTMLElement) => HTMLElement | undefined | false;
}
export type MoveDataType = DataType;

const getDisElement = (element: HTMLElement, data: DataType, x: number, y: number) => {
  if (!element) return;
  const rect = element?.getBoundingClientRect();
  Object.assign(data, {
    elDisY: y - rect.top,
    elDisX: x - rect.left,
  });
};

const numScale = (e: MouseEvent, options?: Options) => {
  const { clientX, clientY } = e;
  const scale = unref(options?.scale) ?? 1;

  return {
    clientX: clientX / scale,
    clientY: clientY / scale,
  };
};

const handleBoundary = (options?: Options) => {
  const moveDis = { l: 0, r: 0, t: 0, b: 0 };

  const sunBoundary = (element?: HTMLElement) => {
    const boundary = unref(options?.boundary);
    if (!element || !boundary) return;
    const s = unref(options?.scale) ?? 1;
    const expand = options?.expand ?? 0;

    let boundaryT = 0;
    let boundaryL = 0;
    let boundaryR = document.documentElement.clientWidth;
    let boundaryB = document.documentElement.clientHeight;
    if (boundary !== window) {
      const { left, top, right, bottom } = (boundary as Element).getBoundingClientRect();
      boundaryT = top - expand;
      boundaryL = left - expand;
      boundaryR = right + expand;
      boundaryB = bottom + expand;
    }

    const rect = element.getBoundingClientRect();
    Object.assign(moveDis, {
      l: (boundaryL - rect.left) / s,
      r: (boundaryR - rect.right) / s,
      t: (boundaryT - rect.top) / s,
      b: (boundaryB - rect.bottom) / s,
    });
  };

  return {
    moveDis,
    sunBoundary,
  };
};

const getTarget = (e: MouseEvent, el: TargetElement, options?: Options) => {
  const target = e.target as HTMLElement;
  const agency = options?.agency;
  const agencyTarget = options?.agencyTarget;
  if (!agency) return unref(el);

  const t = agencyTarget?.(target) ?? target;
  if (!t) return false;
  return t;
};

export function useMouseMove(el: TargetElement, options?: Options) {
  const isMove = ref(false);
  const data = reactive<DataType>({ ...defaultData });
  const { moveDis, sunBoundary } = handleBoundary(options);

  let target: HTMLElement;
  const mousedown = (e: MouseEvent) => {
    const res = getTarget(e, el, options);
    if (!res) return;
    target = res;

    options?.prevent && e.preventDefault();
    options?.stop && e.stopPropagation();
    const { clientX, clientY } = numScale(e, options);
    isMove.value = true;
    data.startX = clientX;
    data.startY = clientY;
    sunBoundary(target);
    getDisElement(target, data, clientX, clientY);
    options?.down?.(data, e, target);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  const mousemove = (e: MouseEvent) => {
    if (!isMove.value) return;
    options?.prevent && e.preventDefault();
    options?.stop && e.stopPropagation();
    const { clientX, clientY } = numScale(e, options);
    let disX = clientX - data.startX;
    let disY = clientY - data.startY;

    if (options?.moveLimit && options?.boundary) {
      disX = disX > 0 ? Math.min(moveDis.r, disX) : Math.max(moveDis.l, disX);
      disY = disY > 0 ? Math.min(moveDis.b, disY) : Math.max(moveDis.t, disY);
    }

    Object.assign(data, {
      disX,
      disY,
      moveX: clientX,
      moveY: clientY,
      maxMoveDisR: moveDis.r,
      maxMoveDisL: moveDis.l,
      maxMoveDisB: moveDis.b,
      maxMoveDisT: moveDis.t,
    });
    options?.move?.(data, e, target);
  };

  const mouseup = (e: MouseEvent) => {
    if (!isMove.value) return;
    options?.prevent && e.preventDefault();
    options?.stop && e.stopPropagation();
    isMove.value = false;
    options?.up?.(data, e, target);
    Object.assign(data, defaultData);
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
  };

  useEventListener("mousedown", mousedown, { target: el });
  return {
    data,
    isMove,
  };
}
