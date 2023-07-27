import { AppContext, createVNode, ref, render } from "vue";
import ModalConstructor from "./modal";

import type { ModalProps } from "./types";

function createModal(
  options: Partial<ModalProps & { onClose: (type: string) => void; onConfirm: () => void }>,
  context?: AppContext | null
) {
  const container = document.createElement("div");

  const onDestroy = () => {
    render(null, container);
  };

  const vNode = createVNode({
    setup() {
      const modelValue = ref(true);
      const onShow = (val: boolean) => (modelValue.value = val);
      return () => (
        <ModalConstructor
          {...options}
          modelValue={modelValue.value}
          onDestroy={onDestroy}
          onUpdate:modelValue={onShow}
        />
      );
    },
  });
  if (context) vNode.appContext = context;
  render(vNode, container);
}

export function showModal(options: Partial<ModalProps>) {
  return new Promise((resolve) => {
    createModal({
      ...options,
      onClose: (type: string) => {
        resolve(type);
      },
      onConfirm() {
        resolve("confirm");
      },
    });
  });
}
