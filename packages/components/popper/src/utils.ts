import { getNodeName, isHTMLElement } from "@nimble-ui/utils";
import type { DOMClientRect, PopperRect } from "./types";

type Polyfill = (element: HTMLElement) => Element | null;

function getTrueOffsetParent(element: Element, polyfill: Polyfill | undefined): Element | null {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }

  if (polyfill) {
    return polyfill(element);
  }

  return element.offsetParent;
}

export function getOffsetParent(element: Element, polyfill?: Polyfill): Element | Window {
  if (!isHTMLElement(element)) return window;

  let offsetParent = getTrueOffsetParent(element, polyfill);

  while (offsetParent && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }

  if (
    offsetParent &&
    (getNodeName(offsetParent) === "html" ||
      (getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static"))
  ) {
    return window;
  }

  return offsetParent || window;
}

export function rectToClientRect(rect: PopperRect): DOMClientRect {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
  };
}
