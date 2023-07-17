import { ExtractPropTypes, PropType, VNode } from "vue";
import { mergeCommonProp } from "@yy/utils";

export type MessageType = "success" | "info" | "warning" | "error";

const messageProps = mergeCommonProp({
  /**
   * @description 唯一标识
   */
  id: {
    type: String,
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
    type: Function,
  },
});

export default messageProps;

export type MessageProps = ExtractPropTypes<ReturnType<typeof messageProps>>;
