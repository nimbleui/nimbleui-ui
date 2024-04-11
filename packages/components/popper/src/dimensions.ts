import {
  getDocumentElement,
  getNodeName,
  getNodeScroll,
  getWindow,
  isHTMLElement,
  isOverflowElement,
} from "@nimble-ui/utils";
import type { DOMClientRect, PopperPlacement, PopperRect, PopperStrategy } from "./types";
import { getOffsetParent, rectToClientRect } from "./utils";

/**
 * @description 获取元素的宽高
 * @param element 目标元素
 * @returns
 */
export function getCssDimensions(element: Element): { width: number; height: number } {
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

export function getElementRect(reference: Element, floating: Element, strategy: PopperStrategy): PopperRect {
  const isFixed = strategy === "fixed";
  const referenceRect = reference.getBoundingClientRect();

  let floatingParentRect: DOMClientRect;
  const floatingWin = getWindow(floating);
  const floatingOffsetParent = getOffsetParent(floating);
  // 如果父元素是window或者是绝对定位
  if (isFixed || floatingWin == floatingOffsetParent) {
    floatingParentRect = rectToClientRect({
      x: 0,
      y: 0,
      width: visualViewport?.width ?? 0,
      height: visualViewport?.height ?? 0,
    });
  } else {
    const { x, y, width, height } = (floatingOffsetParent as Element).getBoundingClientRect();
    floatingParentRect = rectToClientRect({ x, y, width, height });
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

export function computeFromPlacement(
  referenceRect: PopperRect,
  floatingRect: PopperRect,
  placement: PopperPlacement,
  isRTL: boolean
) {
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
  placement: PopperPlacement;
  elements: { reference: Element; floating: Element };
  rects: { reference: DOMClientRect; floating: DOMClientRect };
}
type Middleware = {
  name: string;
  fn: (state: MiddlewareState) => any;
};
interface ComputePositionConfig {
  placement?: PopperPlacement;
  strategy?: PopperStrategy;
  middleware?: Middleware[];
}

export function computePosition(reference: Element, floating: Element, config?: ComputePositionConfig) {
  const { strategy = "absolute", placement = "bottom", middleware = [] } = config || {};
  const referenceRect = getElementRect(reference, floating, strategy);
  const floatingRect = { x: 0, y: 0, ...getCssDimensions(floating) };
  const isRTL = getComputedStyle(floating).direction === "rtl";

  const { x, y } = computeFromPlacement(referenceRect, floatingRect, placement, isRTL);

  for (let i = 0; i < middleware.length; i++) {
    const { name, fn } = middleware[i];
    const data = fn({
      x,
      y,
      placement,
      elements: { floating, reference },
      rects: { floating: rectToClientRect(floatingRect), reference: rectToClientRect(referenceRect) },
    });
  }

  return { x, y };
}
