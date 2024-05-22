import { ExtractPropTypes, HTMLAttributes, PropType, VNode } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";
import { ButtonTypes } from "@nimble-ui/tokens";

export type ModalAction = "confirm" | "close" | "cancel";
type DoneFn = (cancel?: boolean) => void;
type BeforeCloseFn = (done: DoneFn, type: ModalAction) => void;

const modalProps = mergeCommonProp({
  /**
   * @description 是否显示
   */
  modelValue: {
    type: Boolean,
  },
  /**
   * @description 关闭前的回调
   */
  beforeClose: {
    type: Function as PropType<BeforeCloseFn>,
  },
  /**
   * @description 是否需要遮罩层
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否在关闭之后将子元素全部销毁
   */
  destroyOnClose: {
    type: Boolean,
  },
  /**
   * @description 是否自动聚焦 Modal 第一个可聚焦的元素
   */
  autoFocus: {
    type: Boolean,
  },
  /**
   * @description 层级
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 显示内容
   */
  content: {
    type: [String, Object, Function] as PropType<string | VNode | ((details: any) => VNode)>,
  },
  /**
   * @description 插入在哪
   */
  appendTo: {
    type: [String, Object] as PropType<string | Element>,
    default: "body",
  },
  /**
   * @description 确定按钮的文案
   */
  confirmText: {
    type: String,
    default: "确定",
  },
  /**
   * @description 确定按钮的类型
   */
  confirmType: {
    type: String as PropType<ButtonTypes>,
    default: "primary",
  },
  /**
   * @description 取消按钮的文案
   */
  cancelText: {
    type: String,
    default: "取消",
  },
  /**
   * @description 取消按钮的类型
   */
  cancelType: {
    type: String as PropType<ButtonTypes>,
    default: "info",
  },
  /**
   * @description 是否隐藏取消按钮
   */
  hideCancel: {
    type: Boolean,
  },
  /**
   * @description 是否隐藏确定按钮
   */
  hideConfirm: {
    type: Boolean,
  },
  /**
   * @description 禁止穿梭
   */
  disabled: {
    type: Boolean,
  },
  /**
   * @description 提示内容的style
   */
  contentStyle: {
    type: [Array, Object, String] as PropType<HTMLAttributes["style"]>,
  },
});

export default modalProps;

export type ModalProps = ExtractPropTypes<ReturnType<typeof modalProps>>;
