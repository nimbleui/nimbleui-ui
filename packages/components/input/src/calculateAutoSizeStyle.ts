const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`;

const SIZE_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "font-variant",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break",
  "white-space",
];

let hiddenTextarea: HTMLTextAreaElement;

function handleStyle(node: HTMLTextAreaElement) {
  const style = window.getComputedStyle(node);

  const boxSizing =
    style.getPropertyValue("box-sizing") ||
    style.getPropertyValue("-moz-box-sizing") ||
    style.getPropertyValue("-webkit-box-sizing");

  const paddingSize =
    parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));

  const borderSize =
    parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));

  const sizeStyle = SIZE_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  return { borderSize, sizeStyle, boxSizing, paddingSize };
}

export function calculateAutoSizeStyle(node: HTMLTextAreaElement, minRows: number, maxRows?: number) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    document.body.appendChild(hiddenTextarea);
  }

  const { sizeStyle, boxSizing, borderSize, paddingSize } = handleStyle(node);
  hiddenTextarea.setAttribute("style", `${sizeStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = node.value || node.placeholder || "";
  let height = hiddenTextarea.scrollHeight;

  if (boxSizing == "border-box") {
    height += borderSize;
  } else if (boxSizing == "content-box") {
    height -= paddingSize;
  }

  let overflowY: string | undefined = undefined;
  let minHeight: number | undefined = undefined;
  let maxHeight: number | undefined = undefined;
  if (maxRows != null || minRows != null) {
    if (minRows != null) {
      hiddenTextarea.rows = minRows;
      minHeight = hiddenTextarea.clientHeight;
      height = Math.max(minHeight, height);
    }
    if (maxRows != null) {
      hiddenTextarea.rows = maxRows;
      maxHeight = hiddenTextarea.clientHeight;
      overflowY = height < maxHeight ? "hidden" : "";
      height = Math.min(maxHeight, height);
    }
    hiddenTextarea.rows = minRows;
  }

  return {
    height: height ? `${height}px` : undefined,
    overflowY,
    minHeight: minHeight ? `${minHeight}px` : undefined,
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
  };
}
