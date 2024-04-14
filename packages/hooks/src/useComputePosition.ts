import {
  getDocumentElement,
  getNodeName,
  getNodeScroll,
  getOffsetParent,
  getWindow,
  isHTMLElement,
  isOverflowElement,
} from "@nimble-ui/utils";
import { Ref, nextTick, reactive, unref } from "vue";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;
type Placement = Side | AlignedPlacement;
type Strategy = "absolute" | "fixed";
type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface DOMClientRect extends Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type TagElement = Element | undefined | Ref<Element | undefined>;

/**
 * @description 获取元素的宽高
 * @param element 目标元素
 * @returns
 */
function getCssDimensions(element: Element): { width: number; height: number } {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;

  if (Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight) {
    width = offsetWidth;
    height = offsetHeight;
  }

  return {
    width,
    height,
  };
}

function rectToClientRect(rect: Rect): DOMClientRect {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
  };
}

function getElementRect(reference: Element, floating: Element, strategy: Strategy): Rect {
  const isFixed = strategy === "fixed";
  const referenceRect = reference.getBoundingClientRect();

  let floatingParentRect: Rect;
  const floatingWin = getWindow(floating);
  const floatingOffsetParent = getOffsetParent(floating);
  // 如果父元素是window或者是绝对定位
  if (isFixed || floatingWin == floatingOffsetParent) {
    floatingParentRect = {
      x: 0,
      y: 0,
      width: visualViewport?.width ?? 0,
      height: visualViewport?.height ?? 0,
    };
  } else {
    const { x, y, width, height } = (floatingOffsetParent as Element).getBoundingClientRect();
    floatingParentRect = { x, y, width, height };
  }

  let scroll = { scrollLeft: 0, scrollTop: 0 };
  const documentElement = getDocumentElement(floatingOffsetParent);
  if (getNodeName(floatingOffsetParent) !== "body" || isOverflowElement(documentElement)) {
    scroll = getNodeScroll(floatingOffsetParent);
  }

  const y = referenceRect.y + scroll.scrollTop - floatingParentRect.y;
  const x = referenceRect.x + scroll.scrollLeft - floatingParentRect.x;

  return { x, y, width: referenceRect.width, height: referenceRect.height };
}

function computeFromPlacement(referenceRect: Rect, floatingRect: Rect, placement: Placement, isRTL: boolean) {
  const [side, alignment] = placement.split("-");
  const sideAxis = ["bottom", "top"].includes(side) ? "y" : "x";
  const alignmentAxis = sideAxis == "y" ? "x" : "y";
  const align = alignmentAxis == "y" ? "height" : "width";
  const isVertical = sideAxis === "y";

  const x = referenceRect.x + referenceRect.width / 2 - floatingRect.width / 2;
  const y = referenceRect.y + referenceRect.height / 2 - floatingRect.height / 2;
  const dis = referenceRect[align] / 2 - floatingRect[align] / 2;

  let coords: { x: number; y: number };
  switch (side) {
    case "top":
      coords = { x, y: referenceRect.y - floatingRect.height };
      break;
    case "bottom":
      coords = { x, y: referenceRect.y + referenceRect.height };
      break;
    case "right":
      coords = { x: referenceRect.x + referenceRect.width, y };
      break;
    case "left":
      coords = { x: referenceRect.x - floatingRect.width, y };
      break;
    default:
      coords = { x: referenceRect.x, y: referenceRect.y };
  }

  switch (alignment) {
    case "start":
      coords[alignmentAxis] -= dis * (isVertical && isRTL ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += dis * (isVertical && isRTL ? -1 : 1);
      break;
  }

  return coords;
}

interface MiddlewareState {
  x: number;
  y: number;
  placement: Placement;
  middlewareData: { [key: string]: any };
  elements: { reference: Element; floating: Element };
  rects: { reference: DOMClientRect; floating: DOMClientRect };
}
type MiddlewareReturn = {
  x?: number;
  y?: number;
  placement?: Placement;
  data?: { [key: string]: any };
};

// before：获取位置前执行，after：获取位置后执行
type MiddlewareExecuteType = "before" | "after";
type Middleware = {
  name: string;
  type?: MiddlewareExecuteType;
  fn: (state: MiddlewareState) => Promise<MiddlewareReturn> | MiddlewareReturn;
};
interface ComputePositionConfig {
  placement?: Placement;
  strategy?: Strategy;
  middleware?: Middleware[];
}

export function computePositionOffset(number: number): Middleware {
  return {
    name: "offset",
    fn(state) {
      const { x, y, placement } = state;
      const side = placement.split("-")[0];
      let nextX = x;
      let nextY = y;
      if (side === "bottom") {
        nextY += number;
      } else if (side === "right") {
        nextX += number;
      } else if (side === "top") {
        nextY -= number;
      } else if (side === "left") {
        nextX -= number;
      }

      return {
        x: nextX,
        y: nextY,
      };
    },
  };
}

export const computePositionAutoPlacement = (number = 0): Middleware => {
  return {
    name: "autoPlacement",
    type: "before",
    fn(state) {
      const { placement: initPlacement, rects } = state;
      const { reference, floating } = rects;
      const [side, alignment] = initPlacement.split("-") as [Side, Alignment];
      const { innerHeight, innerWidth } = window;

      let placement = initPlacement;
      if (side == "bottom") {
        const flag = reference.bottom + floating.height + number > innerHeight;
        if (flag) {
          placement = `top-${alignment}`;
        }
      } else if (side == "top") {
        const flag = floating.height + number > reference.y;
        if (flag) {
          placement = `bottom-${alignment}`;
        }
      } else if (side == "left") {
        const flag = floating.width + number > reference.x;
        if (flag) {
          placement = `right-${alignment}`;
        }
      } else if (side == "right") {
        const flag = reference.right + floating.width + number > innerWidth;
        if (flag) {
          placement = `left-${alignment}`;
        }
      }

      return { placement };
    },
  };
};

const handleMiddleware = async (
  list: Middleware[],
  type: MiddlewareExecuteType,
  options: {
    x?: number;
    y?: number;
    placement: Placement;
    middlewareData: { [key: string]: any };
    elements: { reference: Element; floating: Element };
    rects: { reference: DOMClientRect; floating: DOMClientRect };
  }
) => {
  let { placement, x = 0, y = 0, middlewareData } = options;
  const { elements, rects } = options;

  for (let i = 0; i < list.length; i++) {
    const { name, type: t = "after", fn } = list[i];
    if (type !== t) continue;

    const {
      x: nextX,
      y: nextY,
      placement: nextPlacement,
      data,
    } = await fn({
      x,
      y,
      placement,
      middlewareData,
      elements,
      rects,
    });

    placement = nextPlacement ?? placement;
    x = nextX ?? x;
    y = nextY ?? y;
    middlewareData = {
      ...middlewareData,
      [name]: { placement, data },
    };
  }

  return { placement, x, y, middlewareData };
};

export function useComputePosition(reference: TagElement, floating: TagElement, config: ComputePositionConfig = {}) {
  const dataPosition = reactive({ x: 0, y: 0 });

  const computePosition = async () => {
    await nextTick();

    const { strategy = "absolute", middleware = [] } = config;
    let placement = config.placement ?? "bottom";

    const referenceEl = unref(reference);
    const floatingEl = unref(floating);

    if (!referenceEl || !floatingEl) return { x: 0, y: 0 };

    // 获取元素的位置信息
    const referenceRect = getElementRect(referenceEl, floatingEl, strategy);
    const floatingRect = { x: 0, y: 0, ...getCssDimensions(floatingEl) };
    const isRTL = getComputedStyle(floatingEl).direction === "rtl";

    const elementInfo = {
      elements: { floating: referenceEl, reference: floatingEl },
      rects: { floating: rectToClientRect(floatingRect), reference: rectToClientRect(referenceRect) },
    };

    let middlewareData: { [key: string]: any } = {};
    ({ placement, middlewareData } = await handleMiddleware(middleware, "before", {
      placement,
      middlewareData,
      ...elementInfo,
    }));

    let { x, y } = computeFromPlacement(referenceRect, floatingRect, placement, isRTL);

    ({ placement, middlewareData, x, y } = await handleMiddleware(middleware, "after", {
      x,
      y,
      placement,
      middlewareData,
      ...elementInfo,
    }));

    dataPosition.x = x;
    dataPosition.y = y;

    return { x, y, placement };
  };

  return { dataPosition, computePosition };
}
