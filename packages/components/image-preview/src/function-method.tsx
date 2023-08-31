import { type AppContext, createVNode, render } from "vue";
import { isArray, isString } from "@nimble-ui/utils";
import ImagePreviewConstructor from "./imagePreview";

interface ImagePreviewOptions {
  src: string | string[];
  currentIndex?: number;
}

function createImagePreview(options: Partial<ImagePreviewOptions>, context?: AppContext | null) {
  const container = document.createElement("div");
  const { src = [] } = options;
  let { currentIndex = 0 } = options;

  const props = {
    isGroup: isArray(src) ? true : false,
    onPrev() {
      if (currentIndex > 0) {
        currentIndex -= 1;
      } else {
        currentIndex = src.length - 1;
      }

      vm?.exposed?.setPreviewSrc(src[currentIndex]);
    },
    onNext() {
      if (currentIndex < src.length - 1) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }

      vm?.exposed?.setPreviewSrc(src[currentIndex]);
    },
  };

  const vNode = createVNode(ImagePreviewConstructor, props);
  if (context) vNode.appContext = context;
  render(vNode, container);
  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild);
  }
  const vm = vNode.component;
  vm?.exposed?.setPreviewSrc(isString(src) ? src : src[currentIndex]);
  vm?.exposed?.toggle(true);
  return vm;
}

export function showImagePreview(options: Partial<ImagePreviewOptions>) {
  return createImagePreview(options);
}
