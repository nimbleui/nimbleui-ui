export function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

export function isElement(value: unknown): value is Element {
  return value instanceof Element || value instanceof getWindow(value).Element;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}

export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

export function isNode(value: unknown): value is Node {
  return value instanceof Node || value instanceof getWindow(value).Node;
}

export function getNodeName(node: Node | Window): string {
  if (isNode(node)) {
    return node.nodeName.toLowerCase();
  }
  return "";
}

export function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !["inline", "contents"].includes(display)
  );
}

export function getDocumentElement(node: Node | Window): HTMLElement {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document)?.documentElement;
}

export function getNodeScroll(element: Element | Window): {
  scrollLeft: number;
  scrollTop: number;
} {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }

  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}
