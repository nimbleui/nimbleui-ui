type ScrollElement = HTMLElement | Window;

const overflowScrollReg = /scroll|auto|overlay/i;

const overflowKeys = {
  undefined: "overflow",
  true: "overflowY",
  false: "overflowX",
} as const;

const ELEMENT_NODE_TYPE = 1;
function isElement(node: Element) {
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el: Element, isVertical?: boolean, root: ScrollElement | undefined = window) {
  let node = el;

  const key = overflowKeys[String(isVertical) as keyof typeof overflowKeys];

  while (node && node !== root && isElement(node)) {
    const overflow = window.getComputedStyle(node)[key];
    if (overflowScrollReg.test(overflow)) {
      return node;
    }
    node = node.parentNode as Element;
  }

  return root;
}
