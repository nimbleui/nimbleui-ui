import { AppContext, createVNode, ref, render } from "vue";
import ModalConstructor from "./modal";

import type { ModalProps } from "./types";

function createModal(options: Partial<ModalProps>, context?: AppContext | null) {
  const container = document.createElement("div");

  const props = {
    ...options,
  };

  const vNode = createVNode(
    {
      setup() {
        const modelValue = ref(true);
        return () => <ModalConstructor modelValue={modelValue.value} />;
      },
    },
    props
  );
  if (context) vNode.appContext = context;
  render(vNode, container);
}

export function showModal(options: Partial<ModalProps>) {
  return new Promise(() => {
    createModal(options);
  });
}
