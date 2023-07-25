import { ExtractPropTypes, PropType, VNode } from "vue";
import { mergeCommonProp } from "@yy/utils";

type DoneFn = (cancel?: boolean) => void;
type BeforeCloseFn = (done: DoneFn) => void;

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
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "body",
  },
});

export default modalProps;

export type ModalProps = ExtractPropTypes<ReturnType<typeof modalProps>>;
