import { AppContext, createVNode, ref, render } from "vue";
import ModalConstructor from "./modal";

import type { ModalProps } from "./types";

function initInstance() {
  const Wrapper = {
    setup() {
      const modelValue = ref(true);
      return () => <ModalConstructor modelValue={modelValue.value} />;
    },
  };

  return Wrapper;
}

function createModal(options: Partial<ModalProps>, context?: AppContext | null) {
  const container = document.createElement("div");

  const props = {
    ...options,
  };

  const vNode = createVNode(initInstance(), props);
  if (context) vNode.appContext = context;
  render(vNode, container);
}

export function showModal(options: Partial<ModalProps>) {
  createModal(options);
}
