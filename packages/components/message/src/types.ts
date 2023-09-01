import { AppContext, ComponentInternalInstance, ExtractPropTypes, PropType, VNode } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

export const messageTypes = ["success", "info", "warning", "error"] as const;

export type MessageType = (typeof messageTypes)[number];

const messageProps = mergeCommonProp({
  /**
   * @description 唯一标识
   */
  id: {
    type: String,
    default: "",
  },
  /**
   * @description 消息文字
   */
  message: {
    type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
  },
  /**
   * @description 消息类型
   */
  type: {
    type: String as PropType<MessageType>,
    default: "",
  },
  /**
   * @description 距离窗口顶部的偏移量
   */
  offset: {
    type: Number,
    default: 16,
  },
  /**
   * @description 文字是否居中
   */
  center: {
    type: Boolean,
  },
  /**
   * @description 层级
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 关闭时的回调函数, 参数为被关闭的 message 实例
   */
  onClose: {
    type: Function as PropType<() => void>,
  },
  /**
   * @description 显示时间，单位为毫秒。 设为 0 则不会自动关闭
   */
  duration: {
    type: Number,
    default: 3000,
  },
});

export default messageProps;

export type MessageProps = ExtractPropTypes<ReturnType<typeof messageProps>>;

export type MessageOptions = Partial<
  Omit<MessageProps, "id"> & {
    appendTo?: HTMLElement | string;
  }
>;
export type MessageParamsNormalized = Omit<MessageProps, "id"> & {
  appendTo: HTMLElement;
};

export type MessageParams = MessageOptions | MessageOptions["message"];
export type MessageOptionsWithType = Omit<MessageOptions, "type">;
export type MessageParamsWithType = MessageOptionsWithType | MessageOptions["message"];
export interface MessageHandler {
  close: () => void;
}
export type MessageFn = {
  (options?: MessageParams, appContext?: AppContext | null): MessageHandler;
  closeAll(type?: MessageType): void;
};
export type MessageTypedFn = (options?: MessageParamsWithType, appContext?: AppContext | null) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}

export interface MessageInstance {
  id: string;
  vm: ComponentInternalInstance;
  props: MessageParamsNormalized;
  handler: MessageHandler;
}
