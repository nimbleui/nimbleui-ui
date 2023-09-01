import { AppContext, createVNode, isVNode, render } from "vue";
import { isFunction, isString } from "@nimble-ui/utils";

import MessageConstructor from "./message";
import { messageTypes } from "./types";
import { instances } from "./instance";
import type { MessageParamsNormalized, MessageFn, Message, MessageParams, MessageOptions } from "./types";

let count = 1;

const closeMessage = (id: string) => {
  const index = instances.findIndex((instance) => instance.id === id);
  if (index === -1) return;

  instances.splice(index, 1);
};

function createMessage({ appendTo, ...options }: MessageParamsNormalized, context?: AppContext | null) {
  const id = `message_${count++}`;
  const userOnClose = options.onClose;

  const container = document.createElement("div");

  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(id);
    },
    onDestroy: () => {
      render(null, container);
    },
  };
  const vNode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message) ? props.message : () => props.message,
        }
      : null
  );
  if (context) vNode.appContext = context;
  render(vNode, container);
  if (container.firstElementChild) {
    appendTo.appendChild(container.firstElementChild);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = vNode.component!;

  return {
    id,
    vm,
    props: vm.props as any,
    handler: {
      close: () => {
        if (vm.exposed) {
          vm.exposed.close?.();
        }
      },
    },
  };
}

/**
 * 处理参数
 * @param params 传入的参数
 * @returns
 */
const handleOptions = (params: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? {
          message: params,
        }
      : params;

  const { appendTo } = options;
  if (!appendTo) {
    options.appendTo = document.body;
  } else if (isString(appendTo)) {
    let el = document.querySelector<HTMLElement>(appendTo);

    if (!el) el = document.body;
    options.appendTo = el;
  }
  return options as MessageParamsNormalized;
};

/**
 * 创建message
 * @param options 参数
 * @param context 上下文环境
 * @returns
 */
const message: MessageFn & Partial<Message> = (options = {}, context) => {
  const normalized = handleOptions(options);
  const instance = createMessage(normalized, context);

  instances.push(instance);
  return instance.handler;
};

messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = handleOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});

message.closeAll = (type) => {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
};

export default message as Message;
