import { createVNode } from "vue";
import MessageConstructor from "./message";

let seed = 1;

function createMessage(options: any) {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  const container = document.createElement("div");
  const vnode = createVNode(MessageConstructor);
}
